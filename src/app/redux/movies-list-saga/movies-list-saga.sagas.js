import { put, takeEvery, all, fork } from "redux-saga/effects";


import ApiService from 'app_services/ApiMovies.service';
import { actionKeys, asyncActionMaps } from 'app_redux/movies-list-saga/movies-list-saga.action';
// import * as apiMovies from "@/api/apiMovies";

// watch
export function* watchMovieBrowser() {
  console.warn('-- movies-list-saga.sagas.js, *watchMovieBrowser()');
  yield all([
    takeEvery(actionKeys.GET_MOVIES, getMoviesSaga),
    takeEvery(actionKeys.GET_GENRES, getGenresSaga),
  ]);
}

// sagas
function* getMoviesSaga({
  type,
  moviesType = 'now_playing',
  page = 1
}) {
  const actions = asyncActionMaps[type];

  console.warn('-- movies-list-saga.sagas.js, *getMoviesSaga(), type:', type);

  const requestData = {
    url: `/movie/${moviesType}`,
    urlParams: `&page=${page}`
  };

  yield put(actions.start({ moviesType, page }));
  try {
    const response = yield ApiService.fetch(requestData);

    let data = response.ok
      ? yield response.json()
      : yield response.text()
        .then(text => { throw new Error(text) })

    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getGenresSaga({ type }) {
  const actions = asyncActionMaps[type];

  console.warn('-- movies-list-saga.sagas.js, *getGenresSaga(), type:', type);

  yield put(actions.start());
  try {
    const response = yield ApiService.fetch({ url: '/genre/movie/list' });

    let data = response.ok
      ? yield response.json()
      : yield response.text()
        .then(text => { throw new Error(text) })
    console.warn('-- movies-list-saga.sagas.js, *getGenresSaga(), data:', data);
    yield put(actions.success(data.genres));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

export default function* root() {
  yield all([
    fork(watchMovieBrowser)
  ]);
};