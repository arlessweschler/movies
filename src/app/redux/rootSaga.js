import { all, fork } from 'redux-saga/effects';

import { watchMovieBrowser } from 'app_redux/sagas/movies-list/movies-list.sagas';

import { watchMovieDetails } from 'app_redux/sagas/movie-details/movie-details.sagas';

export default function* root() {
  yield all([
    fork(watchMovieBrowser),
    fork(watchMovieDetails)
  ]);
};