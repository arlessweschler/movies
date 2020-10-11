import { combineReducers } from 'redux';

import {
  usersList
} from './users-list/users-list.reducer';

import {
  userDetails
} from './user-details/user-details.reducer';

import moviesReducer from 'app_redux/movies-saga/movies-saga.reducers';


export default combineReducers({
  usersList,
  userDetails,

  moviesList: moviesReducer.movies,
  moviesGenres: moviesReducer.genres
});