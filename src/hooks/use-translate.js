import { useEffect, useMemo, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());

  const unsubscribe = useMemo(() => {
    return i18n.subscribe(lang => {
      setLang(lang);
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  const onSetLang = lang => {
    i18n.setLang(lang);
  };

  const t = (text, number) => i18n.translate(text, number);

  return { t, lang, setLang: onSetLang };
}