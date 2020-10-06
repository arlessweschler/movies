import {
  MOVIES_GENRES_IS_LOADING,
  MOVIES_GENRES_LOADING_SUCCESS,
  MOVIES_GENRES_LOADING_ERROR
} from './movies-genres.constants';


const defaultMoviesGenres = {
  genres: [],
  genresWasFetched: false,
  genresIsLoading: false,
  genresHasErrors: false
};

function moviesGenres(state = defaultMoviesGenres, action) {
  switch (action.type) {
    case MOVIES_GENRES_IS_LOADING:
      return {
        ...state,
        genresIsLoading: action.genresIsLoading
      };

    case MOVIES_GENRES_LOADING_ERROR:
      return {
        ...state,
        genresIsLoading: action.genresIsLoading,
        genresHasErrors: action.genresHasErrors
      };

    case MOVIES_GENRES_LOADING_SUCCESS:
      const { genres } = action.data;
      return {
        ...state,
        genres,
        genresWasFetched: action.genresWasFetched,
        genresIsLoading: action.genresIsLoading,
        genresHasErrors: action.genresHasErrors
      };

    default:
      return state;
  }
};

export {
  moviesGenres
};