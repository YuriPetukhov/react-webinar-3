import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  const switchLanguage = (lang) => {
    const supportedLanguages = ['en', 'ru'];
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    } else {
      console.warn(`Language "${lang}" is not supported.`);
    }
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
