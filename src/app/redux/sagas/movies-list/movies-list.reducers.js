import { actionKeys } from 'app_redux/sagas/movies-list/movies-list.actions';
// import { combineReducers } from 'redux';
import { createAsyncReducer, } from 'app_redux/helpers/reducers.helper';

/* const moviesReducer = combineReducers({
  movies: createAsyncReducer(actionKeys.GET_MOVIES),
  genres: createAsyncReducer(actionKeys.GET_GENRES)
}); */

export const DEFAULT_MOVIES_TYPE = 'now_playing';

const DEFAULT_MOVIES_STATE = {
  data: {
    page: 1,
    total_pages: null,
    total_results: null,
    results: []
  },
  isLoading: false,
  error: null,
  request: {}
};

const DEFAULT_GENRES_STATE = {
  data: [],
  isLoading: false,
  error: null
};

const moviesReducer = {
  movies: createAsyncReducer(
    actionKeys.GET_MOVIES,
    { initialState: DEFAULT_MOVIES_STATE }
  ),
  genres: createAsyncReducer(
    actionKeys.GET_GENRES,
    { initialState: DEFAULT_GENRES_STATE }
  )
};

// export { moviesReducer };
export default moviesReducer;