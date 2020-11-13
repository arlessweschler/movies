import { put, takeEvery, all } from 'redux-saga/effects';

import ApiService from 'app_services/ApiService';
import { actionKeys, asyncActionMaps } from 'app_redux/sagas/movies-list/movies-list.actions';

// workers
function* getMoviesSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { moviesType, page, lng, search } = request;

  yield put(actions.start(request));
  try {
    const data = yield ApiService.fetch({
      url: search
        ? '/search/movie'
        : `/movie/${moviesType}`,
      params: search
        ? { page, query: search }
        : { page, lng }
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getGenresSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const { lng } = request;

  yield put(actions.start({ lng }));
  try {
    const data = yield ApiService.fetch({
      url: '/genre/movie/list',
      params: { lng }
    });
    yield put(actions.success(data.genres));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

// watchers
export function* watchMovieBrowser() {
  yield all([
    takeEvery(actionKeys.MOVIES_LIST, getMoviesSaga),
    takeEvery(actionKeys.GENRES_LIST, getGenresSaga)
  ]);
}