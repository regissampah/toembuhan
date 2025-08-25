import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations, TranslationKey } from '../translations';

type Theme = 'light' | 'dark';
type Language = 'en' | 'id';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface SettingsContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: TranslationKey, ...args: any[]) => any;
    installPromptEvent: BeforeInstallPromptEvent | null;
    triggerInstallPrompt: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');
    const [language, setLanguage] = useState<Language>('id');
    const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        const storedLang = localStorage.getItem('language') as Language | null;

        if (storedTheme) {
            setTheme(storedTheme);
        }
        // If no stored theme, the `useState('light')` default is used.

        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setInstallPromptEvent(e as BeforeInstallPromptEvent);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const triggerInstallPrompt = async () => {
        if (!installPromptEvent) {
            console.log("Install prompt not available");
            return;
        }
        installPromptEvent.prompt();
        await installPromptEvent.userChoice;
        setInstallPromptEvent(null);
    };

    const t = useMemo(() => (key: TranslationKey) => {
        return translations[language][key] || translations['en'][key];
    }, [language]);

    const value = {
        theme,
        setTheme,
        language,
        setLanguage,
        t,
        installPromptEvent,
        triggerInstallPrompt
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};