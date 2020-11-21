const defaultLanguageValue = 'en';

const LANGUAGES = [
  { value: 'en', region: 'US', label: 'EN' },
  { value: 'ru', region: 'RU', label: 'RU' }
];

const DEFAULT_LANGUAGE = LANGUAGES.find((i) => i.value === defaultLanguageValue);

export {
  LANGUAGES,
  DEFAULT_LANGUAGE
};