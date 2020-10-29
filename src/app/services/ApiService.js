require('isomorphic-fetch');

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
    useMoviesApi = false,
    url = '',
    urlParams = ''
  }) {
    let fetchUrl;
    let fetchFunc;
    const fetchParams = { method: 'GET' };

    try {
      if (useMoviesApi) {
        fetchUrl = `${TMDB_API_HOST}${url}?api_key=${TMDB_API_KEY}&${urlParams}`;
        fetchFunc = fetchJson;

      } else {
        fetchUrl = `${process.env.API_PATH}${url}`;
        fetchFunc = fetch;
      }

      // console.log(`\n-- ApiService, fetchUrl: ${fetchUrl}`);

      return fetchFunc(fetchUrl, fetchParams);

    } catch (error) {
      console.log('-- ApiService, error:', error);
      throw new Error('Error in ApiService!');
    }
  }
};