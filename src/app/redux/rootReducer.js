import { combineReducers } from 'redux';

import {
  usersList
} from './users-list/users-list.reducer';

import {
  userDetails
} from './user-details/user-details.reducer';

import moviesReducer from 'app_redux/sagas/movies-list/movies-list.reducers';

import movieDetailsReducer from 'app_redux/sagas/movie-details/movie-details.reducers';

export default combineReducers({
  usersList,
  userDetails,

  moviesList: moviesReducer.movies,
  moviesGenres: moviesReducer.genres,

  movieDetails: movieDetailsReducer
});