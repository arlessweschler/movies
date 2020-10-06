import {
  MOVIES_LIST_IS_LOADING,
  MOVIES_LIST_LOADING_SUCCESS,
  MOVIES_LIST_LOADING_ERROR,
  MOVIES_FILTER_UPDATED
} from './movies-list.constants';


const defaultMoviesList = {
  movies: [],
  filter: {
    key: "now_playing",
    value: "Сейчас в кино"
  },
  moviesWasFetched: false,
  moviesIsLoading: false,
  moviesHasErrors: false
};

function moviesList(state = defaultMoviesList, action) {
  switch (action.type) {
    case MOVIES_FILTER_UPDATED:
      return {
        ...state,
        filter: action.filter
      };

    case MOVIES_LIST_IS_LOADING:
      return {
        ...state,
        moviesIsLoading: action.moviesIsLoading
      };

    case MOVIES_LIST_LOADING_ERROR:
      return {
        ...state,
        moviesIsLoading: action.moviesIsLoading,
        moviesHasErrors: action.moviesHasErrors
      };

    case MOVIES_LIST_LOADING_SUCCESS:
      const { results } = action.data;
      return {
        ...state,
        movies: results,
        moviesWasFetched: action.moviesWasFetched,
        moviesIsLoading: action.moviesIsLoading,
        moviesHasErrors: action.moviesHasErrors
      };

    default:
      return state;
  }
};

export {
  moviesList
};