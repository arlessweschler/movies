import { createAsyncReducer } from '@/redux/helpers/reducers.helper';
import { actionKeys } from '@/redux/sagas/movies-list/movies-list.actions';

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
  error: null,
  request: {}
};

const moviesReducer = {
  movies: createAsyncReducer(
    actionKeys.MOVIES_LIST,
    { initialState: DEFAULT_MOVIES_STATE }
  ),
  genres: createAsyncReducer(
    actionKeys.GENRES_LIST,
    { initialState: DEFAULT_GENRES_STATE }
  )
};

export default moviesReducer;