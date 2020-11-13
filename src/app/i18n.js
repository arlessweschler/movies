import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from 'app_locales/en.json';
import ru from 'app_locales/ru.json';

const LANGUAGES = [
  { value: 'en', region: 'US', label: 'EN' },
  { value: 'ru', region: 'RU', label: 'RU' }
];

const defaultLanguageValue = 'en';

const DEFAULT_LANGUAGE = LANGUAGES.find((i) => i.value === defaultLanguageValue);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    fallbackLng: defaultLanguageValue,
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring'],
      lookupQuerystring: 'lng',
    }
  });

export {
  LANGUAGES,
  DEFAULT_LANGUAGE
};

export default i18n;