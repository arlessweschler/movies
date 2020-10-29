import { combineReducers } from 'redux';

import moviesListReducer from 'app_redux/sagas/movies-list/movies-list.reducers';

import movieDetailsReducer from 'app_redux/sagas/movie-details/movie-details.reducers';

export default combineReducers({
  moviesList: moviesListReducer,
  movieDetails: movieDetailsReducer
});