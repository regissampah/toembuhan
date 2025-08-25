import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CameraIcon, UploadIcon, BackArrowIcon, FlashOnIcon, FlashOffIcon } from './IconComponents';
import { useSettings } from '../contexts/SettingsContext';

interface ImageInputProps {
    onSubmit: (imageDataUrl: string) => void;
    onBack: () => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onSubmit, onBack }) => {
    const [mode, setMode] = useState<'select' | 'camera' | 'preview'>('select');
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const { t } = useSettings();

    // State for zoom
    const [isZoomSupported, setIsZoomSupported] = useState(false);
    const [zoomCaps, setZoomCaps] = useState<{min: number, max: number, step: number} | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    
    // State for flash
    const [isFlashSupported, setIsFlashSupported] = useState(false);
    const [isFlashOn, setIsFlashOn] = useState(false);

    // State for capability status message
    const [capabilityStatus, setCapabilityStatus] = useState<string[]>([]);

    const cleanupCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop()
            });
            streamRef.current = null;
        }
        setIsZoomSupported(false);
        setZoomCaps(null);
        setZoomLevel(1);
        setIsFlashSupported(false);
        setIsFlashOn(false);
        setCapabilityStatus([]);
    }, []);

    const handleZoomChange = useCallback(async (newZoomValue: number) => {
        if (!streamRef.current || !zoomCaps) return;
        try {
            const videoTrack = streamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                const clampedZoom = Math.max(zoomCaps.min, Math.min(newZoomValue, zoomCaps.max));
                await videoTrack.applyConstraints({ advanced: [{ zoom: clampedZoom } as any] });
                setZoomLevel(clampedZoom);
            }
        } catch (err) {
            console.error("Failed to apply zoom constraints:", err);
        }
    }, [zoomCaps]);
    
    const handleToggleFlash = useCallback(async () => {
        if (!streamRef.current || !isFlashSupported) return;
        try {
            const videoTrack = streamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                const newFlashState = !isFlashOn;
                await videoTrack.applyConstraints({ advanced: [{ torch: newFlashState } as any] });
                setIsFlashOn(newFlashState);
            }
        } catch (err) {
            console.error("Failed to apply flash constraints:", err);
            setError(t('cameraHardwareError'));
        }
    }, [isFlashOn, isFlashSupported, t]);

    useEffect(() => {
        const startCameraStream = async () => {
            setError(null);
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    const stream = await navigator.mediaDevices.getUserMedia({ 
                        video: { facingMode: 'environment' } 
                    });
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }

                    // Consolidated capabilities check
                    const videoTrack = stream.getVideoTracks()[0];
                    if (videoTrack && typeof videoTrack.getCapabilities === 'function') {
                        const capabilities = videoTrack.getCapabilities() as any;
                        const statusMessages: string[] = [];
                        
                        // Check for zoom
                        if (capabilities.zoom) {
                            setIsZoomSupported(true);
                            setZoomCaps({
                                min: capabilities.zoom.min ?? 1,
                                max: capabilities.zoom.max ?? 10,
                                step: capabilities.zoom.step ?? 0.1,
                            });
                            setZoomLevel(capabilities.zoom.min ?? 1);
                            statusMessages.push("Zoom: Supported");
                        } else {
                            statusMessages.push("Zoom: Not Supported");
                        }
                        
                        // Check for flash (torch)
                        if (capabilities.torch) {
                            setIsFlashSupported(true);
                             statusMessages.push("Flash: Supported");
                        } else {
                            statusMessages.push("Flash: Not Supported");
                        }
                        setCapabilityStatus(statusMessages);
                    }

                } else {
                    setError(t('cameraNotSupportedError'));
                    setMode('select');
                }
            } catch (err) {
                console.error("Camera access error:", err);
                const errorName = (err as any)?.name;

                if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
                    setError(t('cameraPermissionDeniedError'));
                } else if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError' || errorName === 'OverconstrainedError') {
                    setError(t('cameraNotFoundError'));
                } else if (errorName === 'NotReadableError' || errorName === 'TrackStartError') {
                    setError(t('cameraHardwareError'));
                } else {
                    setError(t('cameraAccessError'));
                }
                setMode('select');
            }
        };

        if (mode === 'camera') {
            startCameraStream();
        }

        return () => {
             cleanupCamera();
        };
    }, [mode, t, cleanupCamera]);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImageSrc(result);
                setMode('preview');
            };
            reader.onerror = () => {
                setError(t('fileReadError'));
            }
            reader.readAsDataURL(file);
        }
    };

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if(context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/jpeg');
                setImageSrc(dataUrl);
                cleanupCamera();
                setMode('preview');
            } else {
                setError(t('captureError'));
            }
        }
    };
    
    const reset = () => {
        cleanupCamera();
        setImageSrc(null);
        setError(null);
        setMode('select');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleBack = () => {
        if (mode === 'select') {
            onBack();
        } else {
            reset();
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const renderContent = () => {
        if (mode === 'camera') {
            return (
                <div className="relative w-full aspect-[3/4] bg-black overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] p-1.5 rounded-md backdrop-blur-sm font-mono">
                        {capabilityStatus.map(status => <div key={status}>{status}</div>)}
                    </div>
                    
                    {isFlashSupported && (
                        <button 
                            onClick={handleToggleFlash} 
                            className={`absolute top-6 right-6 p-3 rounded-full text-white transition-colors duration-200 ${isFlashOn ? 'bg-yellow-400/80' : 'bg-black/40 hover:bg-black/60'}`}
                            aria-label={isFlashOn ? "Turn off flash" : "Turn on flash"}
                        >
                            {isFlashOn ? <FlashOnIcon className="w-6 h-6" /> : <FlashOffIcon className="w-6 h-6" />}
                        </button>
                    )}

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        <button onClick={handleCapture} className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border-4 border-white ring-2 ring-black/30 focus:outline-none focus:ring-brand-green/50" aria-label="Capture image"></button>
                    </div>

                    {isZoomSupported && zoomCaps && (
                         <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 p-2 rounded-full backdrop-blur-sm animate-fade-in">
                            <button 
                                onClick={() => handleZoomChange(zoomLevel - zoomCaps.step)} 
                                disabled={zoomLevel <= zoomCaps.min}
                                className="text-white font-bold w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-xl"
                                aria-label="Zoom out"
                            >
                                -
                            </button>
                            <input 
                                type="range"
                                min={zoomCaps.min}
                                max={zoomCaps.max}
                                step={zoomCaps.step}
                                value={zoomLevel}
                                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                                className="w-32 accent-brand-green"
                                aria-label="Zoom slider"
                            />
                             <button 
                                onClick={() => handleZoomChange(zoomLevel + zoomCaps.step)} 
                                disabled={zoomLevel >= zoomCaps.max}
                                className="text-white font-bold w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-xl"
                                aria-label="Zoom in"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        if (mode === 'preview' && imageSrc) {
            return (
                <div className="p-4 sm:p-6 space-y-4">
                    <img src={imageSrc} alt={t('selectedPlantAlt')} className="rounded-xl w-full max-h-96 object-contain" />
                    <button 
                        onClick={() => onSubmit(imageSrc)} 
                        className="w-full bg-brand-green text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-brand-green/90 focus:outline-none focus:ring-4 focus:ring-brand-green/50 dark:focus:ring-brand-green/70 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {t('identifyPlant')}
                    </button>
                </div>
            );
        }

        return (
            <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh] space-y-6">
                 <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">{t('submitAnImage')}</h2>
                 <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                 />
                 <button 
                    onClick={triggerFileUpload}
                    className="w-full bg-brand-green text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-brand-green/90 focus:outline-none focus:ring-4 focus:ring-brand-green/50 dark:focus:ring-brand-green/70 transition-all duration-300 flex items-center justify-center gap-3"
                 >
                    <UploadIcon className="w-6 h-6" />
                    <span>{t('uploadPhoto')}</span>
                 </button>
                 <button 
                    onClick={() => setMode('camera')}
                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-4 px-6 rounded-full text-lg hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all duration-300 flex items-center justify-center gap-3"
                 >
                    <CameraIcon className="w-6 h-6" />
                    <span>{t('useCamera')}</span>
                 </button>
            </div>
        );
    };

    return (
        <div className="animate-fade-in">
             <div className="p-4 flex items-center h-16">
                <button 
                    onClick={handleBack} 
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Go back"
                >
                    <BackArrowIcon className="w-6 h-6" />
                </button>
            </div>
            {error && <p className="text-center text-red-500 p-4 bg-red-50 dark:bg-red-900/30 mx-4 rounded-md">{error}</p>}
            {renderContent()}
        </div>
    );
};

export default ImageInput;