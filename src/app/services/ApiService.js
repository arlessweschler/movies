import qs from 'query-string';

import { TMDB_API_HOST } from 'app_config';
import { formatLng } from 'app_services/UtilsService';

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

      // console.log('\n-- ApiService, queryObject:', queryObject);

      const queryString = qs.stringify({
        ...queryObject,
        api_key: process.env.TMDB_API_KEY
      });

      // console.log('\n-- ApiService, queryString:', queryString);

      const fetchUrl = `${TMDB_API_HOST}${url}?${queryString}`;

      // console.log(`\n-- ApiService, fetchUrl: ${fetchUrl}`);

      return fetchJson(fetchUrl, { method: 'GET' });
    } catch (error) {
      // console.log('-- ApiService, error:', error);
      throw new Error('Error in ApiService!');
    }
  }
};