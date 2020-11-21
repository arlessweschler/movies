import qs from 'query-string';

import history from '@/routing/history';
import { DEFAULT_QUERY_PARAMS } from '@/constants/query-params';

export default function getQueryParams(query = history.location.search) {
  const defaults = DEFAULT_QUERY_PARAMS;

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