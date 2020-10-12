require('isomorphic-fetch');

import {
  TMDB_API_HOST,
  TMDB_API_KEY,
  TMDB_LANGUAGE
} from 'app_config';

export default {
  fetch: function ({
    useMoviesApi = false,
    url = '',
    urlParams = ''
  }) {
    const fetchUrl = useMoviesApi
      ? `${TMDB_API_HOST}${url}?api_key=${TMDB_API_KEY}&${TMDB_LANGUAGE}${urlParams}`
      : `${process.env.API_PATH}${url}`;

    console.log(`\n-- ApiService, fetchUrl: ${fetchUrl}`);

    return fetch(fetchUrl, {
      method: 'GET'
    });
  }
};
