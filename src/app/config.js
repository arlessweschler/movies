require('isomorphic-fetch');

export const TMDB_API_HOST = 'https://api.themoviedb.org/3';
export const TMDB_API_KEY = '22daca9c2a01a7ed9ccd7e750061dddb';
export const TMDB_LANGUAGE = 'language=en-US';
const TMDB_IMAGE_HOST = 'https://image.tmdb.org/t/p';

export const TMDB_IMAGE_URL = {
  small: `${TMDB_IMAGE_HOST}/w185`,
  medium: `${TMDB_IMAGE_HOST}/w300`,
  large: `${TMDB_IMAGE_HOST}/w1280`
};

export const TMDB_MOVIES_TYPES = [
  { key: "now_playing", value: "Сейчас в кино" },
  { key: "popular", value: "Популярные" },
  { key: "top_rated", value: "Лучшие" }
];