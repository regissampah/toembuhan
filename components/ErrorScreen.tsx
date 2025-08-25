import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

interface ErrorScreenProps {
    message: string;
    onReset: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onReset }) => {
    const { t } = useSettings();
    return (
        <div className="p-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full p-4 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('errorTitle')}</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-500/30">{message}</p>
            <button
                onClick={onReset}
                className="bg-brand-green text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-green/90 focus:outline-none focus:ring-4 focus:ring-brand-green/50 dark:focus:ring-brand-green/70 transition-all duration-300"
            >
                {t('tryAgain')}
            </button>
        </div>
    );
};

export default ErrorScreen;