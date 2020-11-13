import { LANGUAGES } from 'app_i18n';

export const lngUrlValue = (lng) => {
  const language = LANGUAGES.find(i => i.value == lng);

  return `${language.value}-${language.region}`;
};