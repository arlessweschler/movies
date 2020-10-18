import { combineReducers } from "redux";

import { actionKeys } from 'app_redux/sagas/movie-details/movie-details.actions';
import { createAsyncReducer, } from 'app_redux/helpers/reducers.helper';

const movieDetailsReducer = combineReducers({
  movie: createAsyncReducer(actionKeys.GET_MOVIE_DETAILS),
  credits: createAsyncReducer(actionKeys.GET_CREDITS)
});

console.warn('-- sagas/movie-details/movie-details.reducers.js, movieDetailsReducer {}');

export default movieDetailsReducer;