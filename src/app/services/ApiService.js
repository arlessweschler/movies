require('isomorphic-fetch');
import qs from 'query-string';

import { TMDB_API_HOST, TMDB_API_KEY, } from 'app_config';

function* fetchJson(url, { method }) {
  const response = yield fetch(url, { method });

  if (response.ok) {
    return yield response.json()
  } else {
    yield response
      .text()
      .then(text => { throw new Error(text) })
  }
};

export default {
  fetch: function ({
    url = '',
    params = {}
  }) {
    try {
      const urlParams = qs.stringify({
        ...params,
        api_key: TMDB_API_KEY
      });

      const fetchUrl = `${TMDB_API_HOST}${url}?${urlParams}`;

      // console.log(`\n-- ApiService, fetchUrl: ${fetchUrl}`);

      return fetchJson(fetchUrl, { method: 'GET' });

    } catch (error) {
      console.log('-- ApiService, error:', error);
      throw new Error('Error in ApiService!');
    }
  }
};