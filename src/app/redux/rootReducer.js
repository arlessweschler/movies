import { combineReducers } from 'redux';

import {
  redirect
} from './common/redirect/redirect.reducer';

import {
  usersList
} from './users-list/users-list.reducer';

import {
  userDetails
} from './user-details/user-details.reducer';

import moviesReducer from 'app_redux/movies-list-saga/movies-list-saga.reducers';


export default combineReducers({
  redirect,
  usersList,
  userDetails,

  moviesList: moviesReducer.movies,
  moviesGenres: moviesReducer.genres
});