import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (lang) => {
    const supportedLanguages = ['en', 'ru'];
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
    } else {
      console.warn(`Language "${lang}" is not supported.`);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
