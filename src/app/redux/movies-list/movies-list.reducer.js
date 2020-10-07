import {
  MOVIES_LIST_IS_LOADING,
  MOVIES_LIST_LOADING_SUCCESS,
  MOVIES_LIST_LOADING_ERROR
} from './movies-list.constants';


const DEFAULT_MOVIES_LIST = {
  movies: {
    page: 1,
    total_results: '',
    total_pages: '',
    results: []
  },
  moviesFetchedType: '',
  filter: 'now_playing',
  moviesWasFetched: false,
  moviesIsLoading: false,
  moviesHasErrors: false
};

function moviesList(state = DEFAULT_MOVIES_LIST, action) {
  switch (action.type) {
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
      return {
        ...state,
        movies: action.data,
        filter: action.filter,
        moviesFetchedType: action.moviesFetchedType,
        moviesWasFetched: action.moviesWasFetched,
        moviesIsLoading: action.moviesIsLoading,
        moviesHasErrors: action.moviesHasErrors
      };

    default:
      return state;
  }
};

export {
  moviesList,
  DEFAULT_MOVIES_LIST
};