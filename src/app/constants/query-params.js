import { DEFAULT_MOVIES_TYPE } from './tmdb';
import { DEFAULT_LANGUAGE } from './languages';

export const DEFAULT_QUERY_PARAMS = {
  lng: DEFAULT_LANGUAGE.value,
  moviesType: DEFAULT_MOVIES_TYPE,
  page: '1',
  search: ''
};