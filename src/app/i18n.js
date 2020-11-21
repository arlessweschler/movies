import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { DEFAULT_LANGUAGE } from '@/constants/languages';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

const configureI18next = (initialLanguage = null) => {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: {
        en: { translation: en },
        ru: { translation: ru }
      },
      fallbackLng: DEFAULT_LANGUAGE.value,
      lng: initialLanguage,
      debug: false,
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ['querystring'],
        lookupQuerystring: 'lng',
      }
    });

  return i18n;
};

export {
  configureI18next
};