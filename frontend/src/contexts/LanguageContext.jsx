import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import idTranslations from '../locales/id';
import enTranslations from '../locales/en';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { user } = useAuth();
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('neokarir_language') || 'id';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('neokarir_language', lang);
  };

  // Sync language with user preferences if available from DB profile
  useEffect(() => {
    const userLang = user?.profile_data?.preferences?.language;
    if (userLang && userLang !== language) {
      setLanguageState(userLang);
      localStorage.setItem('neokarir_language', userLang);
    }
  }, [user]);

  const t = language === 'en' ? enTranslations : idTranslations;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
