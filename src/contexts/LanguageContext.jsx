import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    // Initialize with i18n language, fallback to 'en'
    const [language, setLanguage] = useState(i18n.language || 'en');

    // Sync state with i18n language changes
    useEffect(() => {
        const handleLanguageChanged = (lng) => {
            setLanguage(lng);
        };
        i18n.on('languageChanged', handleLanguageChanged);
        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, [i18n]);

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'vi' : 'en';
        i18n.changeLanguage(newLang);
    };

    // Backward compatibility: provide the nested translation object
    // This allows existing components to continue working with {t.nav.about} syntax
    // while we migrate to {t('nav.about')}
    const t = translations[language] || translations['en'];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
