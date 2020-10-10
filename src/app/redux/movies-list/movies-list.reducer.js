import {
  MOVIES_LIST_PENDING,
  MOVIES_LIST_SUCCESS,
  MOVIES_LIST_ERROR
} from './movies-list.constants';


const DEFAULT_MOVIES_LIST = {
  movies: {
    page: 1,
    total_results: '',
    total_pages: '',
    results: []
  },
  isLoading: false,
  error: null
};

const DEFAULT_MOVIES_FILTER = 'now_playing';

function moviesList(state = DEFAULT_MOVIES_LIST, action) {
  switch (action.type) {
    // case MOVIES_LIST_PENDING:
    case 'GET_MOVIES_START':
      return {
        ...state,
        isLoading: true
      };

    // case MOVIES_LIST_ERROR:
    case 'GET_MOVIES_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    // case MOVIES_LIST_SUCCESS:
    case 'GET_MOVIES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        movies: action.data
      };

    default:
      return state;
  }
};

export {
  moviesList,
  DEFAULT_MOVIES_LIST,
  DEFAULT_MOVIES_FILTER
};