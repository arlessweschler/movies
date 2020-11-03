import { put, takeEvery, all } from 'redux-saga/effects';

import ApiService from 'app_services/ApiService';
import { actionKeys, asyncActionMaps } from 'app_redux/sagas/movies-list/movies-list.actions';
import { lngUrlValue } from 'app_redux/helpers/sagas.helper';

// watchers
export function* watchMovieBrowser() {
  yield all([
    takeEvery(actionKeys.GET_MOVIES, getMoviesSaga),
    takeEvery(actionKeys.GET_GENRES, getGenresSaga),
    takeEvery(actionKeys.RESET_MOVIES, resetMoviesSaga)
  ]);
}

// workers
function* getMoviesSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload
  const { moviesType, page, lng, search } = request;

  try {
    const data = yield ApiService.fetch({
      url: search
        ? '/search/movie'
        : `/movie/${moviesType}`,
      params: search
        ? { page, query: search }
        : { page, language: lngUrlValue(lng) }
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getGenresSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload
  const { lng } = request;

  try {
    const data = yield ApiService.fetch({
      url: '/genre/movie/list',
      params: { language: lngUrlValue(lng) }
    });
    yield put(actions.success(data.genres));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* resetMoviesSaga({ payload }) {
  const { resetList } = payload;
  let actions;

  for (let item of resetList) {
    actions = asyncActionMaps[item];
    try {
      yield put(actions.reset());
    } catch (error) {
      yield put(actions.fail(error.message));
    }
  }
}