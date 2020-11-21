import { DEFAULT_MOVIES_TYPE } from '@/constants/tmdb';
import { DEFAULT_LANGUAGE } from '@/constants/languages';

export default function getDefaultQueryParams() {
  return {
    lng: DEFAULT_LANGUAGE.value,
    moviesType: DEFAULT_MOVIES_TYPE,
    page: '1',
    search: ''
  };
}