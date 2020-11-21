import { put, takeEvery, all } from 'redux-saga/effects';

import API from '@/utils/API';
import { actionKeys, asyncActionMaps } from '@/sagas/movies-list/movies-list.actions';

// workers
function* getMoviesSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { request } = payload;
  const {
    moviesType, page, lng, search
  } = request;

  yield put(actions.start(request));
  try {
    const data = yield API.fetch({
      url: search
        ? '/search/movie'
        : `/movie/${moviesType}`,
      params: search
        ? { page, query: search, lng }
        : { page, lng, region: process.env.TMDB_API_REGION }
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
    const data = yield API.fetch({
      url: '/genre/movie/list',
      params: { lng }
    });
    yield put(actions.success(data.genres));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

// watchers
export default function* watchMovieBrowser() {
  yield all([
    takeEvery(actionKeys.MOVIES_LIST, getMoviesSaga),
    takeEvery(actionKeys.GENRES_LIST, getGenresSaga)
  ]);
}