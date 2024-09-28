import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../language-context';

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  const [resources, setResources] = useState({});

  useEffect(() => {
    const loadResources = async () => {
      try {
        const langResources = await import(`../locales/${language}.json`);
        setResources(langResources);
      } catch (error) {
        console.error(`Failed to load resources for language "${language}":`, error);
      }
    };
    loadResources();
  }, [language]);

  const translate = (key) => {
    console.log('Translating key:', key);
    console.log('Available resources:', resources);

    const keys = key.split('.');
    let translation = resources;

    for (const k of keys) {
      translation = translation[k];
      if (!translation) {
        console.warn(`Translation for key "${key}" not found.`);
        return key;
      }
    }

    return translation;
  };

  return translate;
};
