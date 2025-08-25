import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { SunIcon, MoonIcon, EarthIcon, DownloadIcon } from './IconComponents';

const HeaderControls: React.FC = () => {
    const { theme, setTheme, language, setLanguage, installPromptEvent, triggerInstallPrompt, t } = useSettings();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as 'en' | 'id');
    };

    return (
        <div className="flex items-center justify-end gap-2 sm:gap-4 p-2 mb-2">
            {installPromptEvent && (
                 <button
                    onClick={triggerInstallPrompt}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-green flex items-center gap-2 text-sm font-semibold sm:px-3"
                    aria-label={t('installAppAria')}
                >
                    <DownloadIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">{t('installApp')}</span>
                </button>
            )}

            <div className="relative">
                <EarthIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none"/>
                <select 
                    value={language} 
                    onChange={handleLanguageChange}
                    className="pl-10 pr-4 py-2 text-sm rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-green appearance-none"
                    aria-label="Select language"
                >
                    <option value="en">English</option>
                    <option value="id">Indonesia</option>
                </select>
            </div>

            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-green"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
        </div>
    );
};

export default HeaderControls;