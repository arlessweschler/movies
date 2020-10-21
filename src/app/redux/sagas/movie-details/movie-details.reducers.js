import { combineReducers } from "redux";

import { actionKeys } from 'app_redux/sagas/movie-details/movie-details.actions';
import { createAsyncReducer, } from 'app_redux/helpers/reducers.helper';

const DEFAULT_VIDEOUS_STATE = {
  data: [],
  isLoading: false,
  error: null
};

const movieDetailsReducer = combineReducers({
  movie: createAsyncReducer(actionKeys.MOVIE_DETAILS),
  credits: createAsyncReducer(actionKeys.MOVIE_CREDITS),
  videos: createAsyncReducer(
    actionKeys.MOVIE_VIDEOS,
    { initialState: DEFAULT_VIDEOUS_STATE }
  )
});

export default movieDetailsReducer;