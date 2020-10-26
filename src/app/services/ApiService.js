require('isomorphic-fetch');

import { LANGUAGES, DEFAULT_LANGUAGE } from 'app_i18n';
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
    tmdbOptions = {},
    url = '',
    urlParams = ''
  }) {
    let fetchUrl;
    let fetchFunc;
    const fetchParams = { method: 'GET' };

    try {
      if (useMoviesApi) {
        const language = tmdbOptions.lng
          ? LANGUAGES.find(i => i.value == tmdbOptions.lng)
          : DEFAULT_LANGUAGE;

        const queryLanguage = `language=${language.value}-${language.region}`;

        fetchUrl = `${TMDB_API_HOST}${url}?api_key=${TMDB_API_KEY}&${queryLanguage}${urlParams}`;
        fetchFunc = fetchJson;

      } else {
        fetchUrl = `${process.env.API_PATH}${url}`;
        fetchFunc = fetch;
      }
    } catch (error) {
      console.log('-- ApiService, error:', error);
    }

    // console.log(`\n-- ApiService, fetchUrl: ${fetchUrl}`);

    return fetchFunc(fetchUrl, fetchParams);
  }
};