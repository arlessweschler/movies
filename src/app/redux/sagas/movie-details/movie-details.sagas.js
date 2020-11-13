import { put, takeEvery, all } from 'redux-saga/effects';

import ApiService from 'app_services/ApiService';
import { actionKeys, asyncActionMaps } from 'app_redux/sagas/movie-details/movie-details.actions';

// workers
function* getDetailsSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movie_id, lng } = request;

  yield put(actions.start(request));
  try {
    const data = yield ApiService.fetch({
      url: `/movie/${movie_id}`,
      params: { lng }
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getCreditsSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movie_id, lng } = request;

  yield put(actions.start(request));
  try {
    const data = yield ApiService.fetch({
      url: `/movie/${movie_id}/credits`,
      params: { lng }
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getVideosSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movie_id, lng } = request;

  yield put(actions.start(request));
  try {
    const data = yield ApiService.fetch({
      url: `/movie/${movie_id}/videos`,
      params: { lng }
    });
    yield put(actions.success(data.results));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getImagesSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movie_id } = request;

  yield put(actions.start(request));
  try {
    const data = yield ApiService.fetch({
      url: `/movie/${movie_id}/images`,
      params: { lng: null }
    });
    yield put(actions.success(data.backdrops));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getRecommsSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { movie_id, lng } = request;

  yield put(actions.start(request));
  try {
    const data = yield ApiService.fetch({
      url: `/movie/${movie_id}/recommendations`,
      params: { page: 1, lng }
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* resetMovieDetailsSaga({ payload }) {
  const { resetList } = payload;
  let actions;

  for (const item of resetList) {
    actions = asyncActionMaps[item];
    try {
      yield put(actions.reset());
    } catch (error) {
      yield put(actions.fail(error.message));
    }
  }
}

// watchers
export default function* watchMovieDetails() {
  yield all([
    takeEvery(actionKeys.MOVIE_DETAILS, getDetailsSaga),
    takeEvery(actionKeys.MOVIE_CREDITS, getCreditsSaga),
    takeEvery(actionKeys.MOVIE_VIDEOS, getVideosSaga),
    takeEvery(actionKeys.MOVIE_IMAGES, getImagesSaga),
    takeEvery(actionKeys.MOVIE_RECOMMS, getRecommsSaga),
    takeEvery(actionKeys.MOVIE_RESET_ALL, resetMovieDetailsSaga)
  ]);
}