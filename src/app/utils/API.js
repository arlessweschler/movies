import qs from 'query-string';

import { formatLng } from '@/utils/common';

require('isomorphic-fetch');

function* fetchJson(url, { method }) {
  const response = yield fetch(url, { method });

  if (response.ok) {
    return yield response.json();
  }

  return yield response
    .text()
    .then((text) => { throw new Error(text); });
}

export default {
  fetch({ url = '', params = {} }) {
    try {
      const queryObject = (({
        lng, query, page, region
      }) => ({
        ...(typeof lng !== 'undefined' && {
          language: lng ? formatLng(lng) : null
        }),
        query,
        page,
        region
      }))(params);

      const queryString = qs.stringify({
        ...queryObject,
        api_key: process.env.TMDB_API_KEY
      });

      const fetchUrl = `${process.env.TMDB_API_HOST}${url}?${queryString}`;

      return fetchJson(fetchUrl, { method: 'GET' });

    } catch (error) {
      throw new Error('Error in API module!');
    }
  }
};