import { all, fork } from 'redux-saga/effects';

import watchMovieBrowser from '@/redux/sagas/movies-list/movies-list.sagas';
import watchMovieDetails from '@/redux/sagas/movie-details/movie-details.sagas';

export default function* root() {
  yield all([
    fork(watchMovieBrowser),
    fork(watchMovieDetails)
  ]);
}