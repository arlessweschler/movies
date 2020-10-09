import {
  MOVIES_GENRES_PENDING,
  MOVIES_GENRES_SUCCESS,
  MOVIES_GENRES_FAIL
} from './movies-genres.constants';


const defaultMoviesGenres = {
  genres: [],
  isLoading: false,
  error: null
};

function moviesGenres(state = defaultMoviesGenres, action) {
  switch (action.type) {
    case MOVIES_GENRES_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case MOVIES_GENRES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case MOVIES_GENRES_SUCCESS:
      const { genres } = action.data;
      return {
        ...state,
        genres,
        isLoading: false,
        error: null
      };

    default:
      return state;
  }
};

export {
  moviesGenres
};