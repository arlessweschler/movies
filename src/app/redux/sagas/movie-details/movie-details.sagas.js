import { put, takeEvery, all } from "redux-saga/effects";


import ApiService from 'app_services/ApiService';
import { actionKeys, asyncActionMaps } from 'app_redux/sagas/movie-details/movie-details.actions';


// watchers
export function* watchMovieDetails() {
  yield all([
    takeEvery(actionKeys.MOVIE_DETAILS, getMovieDetailsSaga),
    takeEvery(actionKeys.MOVIE_CREDITS, getCreditsSaga),
    takeEvery(actionKeys.MOVIE_VIDEOS, getVideosSaga),
    takeEvery(actionKeys.RESET_MOVIE_CARD, resetMovieDetailsSaga)
  ]);
}

// workers
function* getMovieDetailsSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { movieId } = payload;

  yield put(actions.start({ movieId }));
  try {
    const data = yield ApiService.fetch({
      useMoviesApi: true,
      url: `/movie/${movieId}`
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getCreditsSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { movieId } = payload;

  yield put(actions.start({ movieId }));
  try {
    const data = yield ApiService.fetch({
      useMoviesApi: true,
      url: `/movie/${movieId}/credits`
    });
    yield put(actions.success(data));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* getVideosSaga({ type, payload }) {
  const actions = asyncActionMaps[type];
  const { movieId } = payload;

  yield put(actions.start({ movieId }));
  try {
    const data = yield ApiService.fetch({
      useMoviesApi: true,
      url: `/movie/${movieId}/videos`
    });
    yield put(actions.success(data.results));
  } catch (error) {
    yield put(actions.fail(error.message));
  }
}

function* resetMovieDetailsSaga({ payload }) {
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