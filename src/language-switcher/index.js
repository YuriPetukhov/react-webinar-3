import React, { useContext } from 'react';
import { LanguageContext } from '../language-context';
import './style.css';

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useContext(LanguageContext);

  return (
    <div>
      <button
        onClick={() => switchLanguage('en')}
        disabled={language === 'en'}
        aria-label="Switch to English"
      >
        English
      </button>
      <button
        onClick={() => switchLanguage('ru')}
        disabled={language === 'ru'}
        aria-label="Switch to Russian"
      >
        Русский
      </button>
    </div>
  );
};

export default LanguageSwitcher;
