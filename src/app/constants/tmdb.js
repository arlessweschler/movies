const imageSizes = {
  small: 'w185',
  medium: 'w300',
  large: 'w1280',
  original: 'original'
};

const imageHost = 'https://image.tmdb.org/t/p';

const TMDB_IMAGE_URL = Object.keys(imageSizes).reduce(
  (acc, key) => {
    acc[key] = `${imageHost}/${imageSizes[key]}`;
    return acc;
  }, {}
);

const TMDB_MOVIES_TYPES = [
  'now_playing',
  'popular',
  'top_rated',
  'upcoming'
];

const DEFAULT_MOVIES_TYPE = 'now_playing';

export {
  TMDB_IMAGE_URL,
  TMDB_MOVIES_TYPES,
  DEFAULT_MOVIES_TYPE
};