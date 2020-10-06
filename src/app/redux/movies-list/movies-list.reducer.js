import {
  MOVIES_LIST_IS_LOADING,
  MOVIES_LIST_LOADING_SUCCESS,
  MOVIES_LIST_LOADING_ERROR,
  MOVIES_FILTER_UPDATED
} from './movies-list.constants';


const defaultMoviesList = {
  list: [],
  filter: {
    key: "now_playing",
    value: "Сейчас в кино"
  },
  listWasFetched: false,
  isLoading: false,
  hasErrors: false
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
        isLoading: action.isLoading
      };

    case MOVIES_LIST_LOADING_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        hasErrors: action.hasErrors
      };

    case MOVIES_LIST_LOADING_SUCCESS:
      const { results } = action.data;
      return {
        ...state,
        list: results,
        listWasFetched: action.listWasFetched,
        isLoading: action.isLoading,
        hasErrors: action.hasErrors
      };

    default:
      return state;
  }
};

export {
  moviesList
};