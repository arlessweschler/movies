import qs from 'query-string';

import history from '@/routing/history';
import getDefaultQueryParams from './getDefaultQueryParams';

export default function getQueryParams(query = history.location.search) {
  const defaults = getDefaultQueryParams();

  const {
    lng = defaults.lng,
    moviesType = defaults.moviesType,
    page = defaults.page,
    search = defaults.search
  } = qs.parse(query);

  return {
    lng, moviesType, page, search
  };
}