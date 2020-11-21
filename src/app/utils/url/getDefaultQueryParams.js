import { DEFAULT_MOVIES_TYPE } from '@/settings/tmdb';
import { DEFAULT_LANGUAGE } from '@/settings/i18n';

export default function getDefaultQueryParams() {
  return {
    lng: DEFAULT_LANGUAGE.value,
    moviesType: DEFAULT_MOVIES_TYPE,
    page: '1',
    search: ''
  };
}