import React, { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

interface LoadingScreenProps {
    imagePreview: string | null;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ imagePreview }) => {
    const { t } = useSettings();
    const loadingMessages = t('loadingMessages');
    const [message, setMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = loadingMessages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, [loadingMessages]);

    return (
        <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]">
            {imagePreview && (
                <div className="relative mb-8">
                    <img src={imagePreview} alt={t('identifyingPlantAlt')} className="rounded-lg max-h-64 w-auto shadow-lg" />
                    <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-brand-green dark:border-brand-green border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            )}
             {!imagePreview && (
                 <div className="w-16 h-16 border-4 border-brand-green dark:border-brand-green border-t-transparent rounded-full animate-spin mb-8"></div>
             )}
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">{t('identifying')}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center transition-opacity duration-500">{message}</p>
        </div>
    );
};

export default LoadingScreen;