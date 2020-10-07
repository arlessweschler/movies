require('isomorphic-fetch');

const HOST_DATA = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '22daca9c2a01a7ed9ccd7e750061dddb';
const LANGUAGE = 'language=en-US';
const HOST_IMAGES = 'https://image.tmdb.org/t/p';

export const TMDB_IMAGE_URL = {
  small: `${HOST_IMAGES}/w185`,
  medium: `${HOST_IMAGES}/w300`,
};

export const MOVIES_TYPES = [
  { key: "now_playing", value: "Сейчас в кино" },
  { key: "popular", value: "Популярные" },
  { key: "top_rated", value: "Лучшие" }
];

export default {
  fetch: function ({ url, urlParams }) {
    const fetchUrl = `${HOST_DATA}${url}?api_key=${TMDB_API_KEY}&${LANGUAGE}${urlParams}`;

    console.log(`\n-- Movies.service, fetchUrl: ${fetchUrl}`);

    return fetch(fetchUrl, {
      method: 'GET'
    });
  }
};
