import {
  redirect
} from './common/redirect/redirect.action';

import {
  loadUsersList,
  clearUsersList
} from './users-list/users-list.action';

import {
  loadUserDetails,
  clearUserDetails
} from './user-details/user-details.action';

import {
  loadMoviesList
} from './movies-list/movies-list.action';

import { getMovies, getGenres } from './movies-list-saga/movies-list-saga.action';

export {
  redirect,

  loadUsersList,
  clearUsersList,

  loadUserDetails,
  clearUserDetails,

  loadMoviesList,

  getMovies,
  getGenres
};