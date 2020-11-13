import { combineReducers } from 'redux';

import { actionKeys } from 'app_redux/sagas/movie-details/movie-details.actions';
import { createAsyncReducer } from 'app_redux/helpers/reducers.helper';

const DEFAULT_VIDEOS_STATE = {
  data: [],
  isLoading: false,
  error: null,
  request: {}
};

const DEFAULT_IMAGES_STATE = {
  data: [],
  isLoading: false,
  error: null,
  request: {}
};

const DEFAULT_RECOMMS_STATE = {
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

const movieDetailsReducer = combineReducers({
  movie: createAsyncReducer(actionKeys.MOVIE_DETAILS),
  credits: createAsyncReducer(actionKeys.MOVIE_CREDITS),
  videos: createAsyncReducer(
    actionKeys.MOVIE_VIDEOS,
    { initialState: DEFAULT_VIDEOS_STATE }
  ),
  images: createAsyncReducer(
    actionKeys.MOVIE_IMAGES,
    { initialState: DEFAULT_IMAGES_STATE }
  ),
  recommsList: createAsyncReducer(
    actionKeys.MOVIE_RECOMMS,
    { initialState: DEFAULT_RECOMMS_STATE }
  )
});

export default movieDetailsReducer;