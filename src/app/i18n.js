import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import backend from "i18next-xhr-backend";

import en from 'app_locales/en.json';
import ru from 'app_locales/ru.json';

const default_language = 'en';

export const LANGUAGES = [
  { value: 'en', region: 'US', label: 'EN' },
  { value: 'ru', region: 'RU', label: 'RU' }
];

export const DEFAULT_LANGUAGE = LANGUAGES.find(i => i.value == default_language)

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  // .use(backend)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    fallbackLng: default_language,
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring'],
      lookupQuerystring: 'lng',
    }
  }); export default i18n;