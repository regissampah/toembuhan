import React from 'react';
import { TreeIcon, ArrowRightIcon } from './IconComponents';
import { useSettings } from '../contexts/SettingsContext';

interface LandingScreenProps {
    onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
    const { t } = useSettings();

    return (
        <div className="p-8 flex flex-col items-center justify-between min-h-[85vh] text-center bg-brand-bg dark:from-slate-900 dark:to-gray-900">
            <div className="flex-shrink-0 mt-8">
                 <h2 className="text-sm font-semibold text-brand-green dark:text-brand-gray tracking-wider">Eksplore Info Tumbuhan</h2>
                 <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mt-2">
                    Toembuhan .Ai
                 </h1>
            </div>

            <div className="my-8">
                <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute w-full h-full rounded-full bg-brand-gray/30 dark:bg-brand-green/20 blur-2xl animate-pulse"></div>
                    <TreeIcon className="w-48 h-48 drop-shadow-lg object-contain relative z-10" />
                </div>
            </div>
            
            <div className="flex-shrink-0 w-full max-w-xs mb-4">
                 <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm">
                    {t('appDescription')}
                 </p>
                 <button
                    onClick={onStart}
                    className="bg-brand-green text-white font-bold w-16 h-16 rounded-full text-lg hover:bg-brand-green/90 focus:outline-none focus:ring-4 focus:ring-brand-green/50 dark:focus:ring-brand-green/70 transition-all duration-300 transform hover:scale-110 flex items-center justify-center mx-auto shadow-lg shadow-brand-green/30"
                    aria-label={t('getStarted')}
                 >
                    <ArrowRightIcon className="w-7 h-7" />
                 </button>
            </div>
        </div>
    );
};

export default LandingScreen;