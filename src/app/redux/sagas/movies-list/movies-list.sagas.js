import { put, takeEvery, all } from 'redux-saga/effects';

import { DEFAULT_LANGUAGE } from 'app_i18n';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';

import ApiService from 'app_services/ApiService';
import { actionKeys, asyncActionMaps } from 'app_redux/sagas/movies-list/movies-list.actions';
import { lngUrlValue } from 'app_redux/helpers/sagas.helper';

// watchers
export function* watchMovieBrowser() {
  yield all([
    takeEvery(actionKeys.GET_MOVIES, getMoviesSaga),
    takeEvery(actionKeys.GET_GENRES, getGenresSaga),
  ]);
}

// workers
function* getMoviesSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const {
    moviesType = DEFAULT_MOVIES_TYPE,
    page = 1,
    lng = DEFAULT_LANGUAGE.value
  } = payload;

  yield put(actions.start({ moviesType, page, lng }));
  try {
    const data = yield ApiService.fetch({
      useMoviesApi: true,
      url: `/movie/${moviesType}`,
      urlParams: `&page=${page}&language=${lngUrlValue(lng)}`
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getGenresSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const {
    lng = DEFAULT_LANGUAGE.value
  } = payload;

  yield put(actions.start({ lng }));
  try {
    const data = yield ApiService.fetch({
      useMoviesApi: true,
      url: '/genre/movie/list',
      urlParams: `&language=${lngUrlValue(lng)}`
    });
    yield put(actions.success(data.genres));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}