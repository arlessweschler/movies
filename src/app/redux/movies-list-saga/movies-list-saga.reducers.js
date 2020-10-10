import { actionKeys } from 'app_redux/movies-list-saga/movies-list-saga.action';
// import { combineReducers } from 'redux';
import { createAsyncReducer, } from 'app_redux/redux';

/* const moviesReducer = combineReducers({
  movies: createAsyncReducer(actionKeys.GET_MOVIES),
  genres: createAsyncReducer(actionKeys.GET_GENRES)
}); */
const DEFAULT_MOVIES_STATE = {
  data: {
    page: 1,
    total_results: '',
    total_pages: '',
    results: []
  },
  isLoading: false,
  error: null,
  request: undefined
};

const DEFAULT_GENRES_STATE = {
  data: [],
  isLoading: false,
  error: null
};

const moviesReducer = {
  movies: createAsyncReducer(actionKeys.GET_MOVIES, DEFAULT_MOVIES_STATE),
  genres: createAsyncReducer(actionKeys.GET_GENRES, DEFAULT_GENRES_STATE)
};

console.warn('-- reducers.js, moviesReducer {}');

// export { moviesReducer };
export default moviesReducer;