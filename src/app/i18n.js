import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import backend from "i18next-xhr-backend";

import en from 'app_locales/en.json';
import ru from 'app_locales/ru.json';

export const LANGUAGES = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' }
];

export const DEFAULT_LANGUAGE = 'en';

export const DEFAULT_LANGUAGE_OBJ = LANGUAGES.find(i => i.value == DEFAULT_LANGUAGE)

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  // .use(backend)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    fallbackLng: DEFAULT_LANGUAGE,
    debug: true,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring'],
      lookupQuerystring: 'lng',
    }
  }); export default i18n;