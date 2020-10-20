import { put, takeEvery, all } from "redux-saga/effects";


import ApiService from 'app_services/ApiService';
import { actionKeys, asyncActionMaps } from 'app_redux/sagas/movie-details/movie-details.actions';


// watchers
export function* watchMovieDetails() {
  console.warn('-- sagas/movie-details/movie-details.sagas.js, *watchMovieDetails()');
  yield all([
    takeEvery(actionKeys.MOVIE_DETAILS, getMovieDetailsSaga),
    takeEvery(actionKeys.MOVIE_CREDITS, getCreditsSaga),
    takeEvery(actionKeys.MOVIE_VIDEOS, getVideosSaga),
    takeEvery(actionKeys.RESET_MOVIE_CARD, resetMovieDetailsSaga)
  ]);
}

// workers
function* getMovieDetailsSaga({
  type,
  movieId
}) {
  const actions = asyncActionMaps[type];

  console.warn('-- sagas/movie-details/movie-details.sagas.js, *getMovieDetailsSaga(), type:', type);

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

function* getCreditsSaga({
  type,
  movieId
}) {
  const actions = asyncActionMaps[type];

  console.warn('-- sagas/movie-details/movie-details.sagas.js, *getCreditsSaga(), type:', type);

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

function* getVideosSaga({
  type,
  movieId
}) {
  const actions = asyncActionMaps[type];

  console.warn('-- sagas/movie-details/movie-details.sagas.js, *getVideosSaga(), type:', type);

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

function* resetMovieDetailsSaga({
  resetList
}) {
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