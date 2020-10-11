import { all, fork } from 'redux-saga/effects';

import { watchMovieBrowser } from "app_redux/movies-saga/movies-saga.sagas";

export default function* root() {
  yield all([
    fork(watchMovieBrowser)
  ]);
};