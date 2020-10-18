import { put, takeEvery, all } from "redux-saga/effects";


import ApiService from 'app_services/ApiService';
import { actionKeys, asyncActionMaps } from 'app_redux/sagas/movie-details/movie-details.actions';


// watchers
export function* watchMovieDetails() {
  console.warn('-- sagas/movie-details/movie-details.sagas.js, *watchMovieDetails()');
  yield all([
    takeEvery(actionKeys.GET_MOVIE_DETAILS, getMovieDetailsSaga)
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