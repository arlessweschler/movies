import { all, fork } from 'redux-saga/effects';

import { watchMovieBrowser } from "app_redux/sagas/movies-list/movies-list.sagas";

export default function* root() {
  yield all([
    fork(watchMovieBrowser)
  ]);
};