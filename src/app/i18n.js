import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import backend from "i18next-xhr-backend";

import en from 'app_locales/en.json';
import ru from 'app_locales/ru.json';

export const options = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' }
];

i18n
  .use(initReactI18next)
  // .use(backend)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    fallbackLng: 'en',
    debug: true,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  }); export default i18n;