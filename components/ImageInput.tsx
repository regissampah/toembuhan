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

    const [isZoomSupported, setIsZoomSupported] = useState(false);
    const [zoomCaps, setZoomCaps] = useState<{min: number, max: number, step: number} | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    
    const [isFlashSupported, setIsFlashSupported] = useState(false);
    const [isFlashOn, setIsFlashOn] = useState(false);

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

                    const videoTrack = stream.getVideoTracks()[0];
                    if (videoTrack && typeof videoTrack.getCapabilities === 'function') {
                        const capabilities = videoTrack.getCapabilities() as any;
                        
                        if (capabilities.zoom) {
                            setIsZoomSupported(true);
                            setZoomCaps({
                                min: capabilities.zoom.min ?? 1,
                                max: capabilities.zoom.max ?? 10,
                                step: capabilities.zoom.step ?? 0.1,
                            });
                            setZoomLevel(capabilities.zoom.min ?? 1);
                        }
                        
                        if (capabilities.torch) {
                            setIsFlashSupported(true);
                        }
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


    if (mode === 'camera') {
        return (
            <div className="fixed inset-0 bg-black z-50 animate-fade-in">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                <canvas ref={canvasRef} className="hidden"></canvas>

                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
                        <button 
                            onClick={handleBack} 
                            className="p-3 rounded-full bg-black/40 text-white transition-colors duration-200 hover:bg-black/60 backdrop-blur-sm"
                            aria-label="Go back"
                        >
                            <BackArrowIcon className="w-6 h-6" />
                        </button>
                        
                        {isFlashSupported && (
                            <button 
                                onClick={handleToggleFlash} 
                                className={`p-3 rounded-full text-white transition-colors duration-200 backdrop-blur-sm ${isFlashOn ? 'bg-yellow-400/80' : 'bg-black/40 hover:bg-black/60'}`}
                                aria-label={isFlashOn ? "Turn off flash" : "Turn on flash"}
                            >
                                {isFlashOn ? <FlashOnIcon className="w-6 h-6" /> : <FlashOffIcon className="w-6 h-6" />}
                            </button>
                        )}
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col items-center gap-6 bg-gradient-to-t from-black/50 to-transparent">
                        {isZoomSupported && zoomCaps && (
                            <div className="w-full max-w-xs flex items-center gap-3 bg-black/40 p-2 rounded-full backdrop-blur-sm">
                                <span className="text-white font-mono text-xs px-2">1x</span>
                                <input 
                                    type="range"
                                    min={zoomCaps.min}
                                    max={zoomCaps.max}
                                    step={zoomCaps.step}
                                    value={zoomLevel}
                                    onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    aria-label="Zoom slider"
                                />
                                <span className="text-white font-mono text-xs px-2">{Math.round(zoomCaps.max)}x</span>
                            </div>
                        )}
                        
                        <button 
                            onClick={handleCapture} 
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 border-4 border-white ring-4 ring-black/30 focus:outline-none focus:ring-offset-2 ring-offset-black/50 focus:ring-brand-green transition-transform active:scale-95" 
                            aria-label="Capture image">
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
            
            {mode === 'preview' && imageSrc ? (
                <div className="p-4 sm:p-6 space-y-4">
                    <img src={imageSrc} alt={t('selectedPlantAlt')} className="rounded-xl w-full max-h-96 object-contain" />
                    <button 
                        onClick={() => onSubmit(imageSrc)} 
                        className="w-full bg-brand-green text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-brand-green/90 focus:outline-none focus:ring-4 focus:ring-brand-green/50 dark:focus:ring-brand-green/70 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {t('identifyPlant')}
                    </button>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default ImageInput;
