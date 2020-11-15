import { combineReducers } from 'redux';

import moviesReducer from '@/redux/sagas/movies-list/movies-list.reducers';
import movieDetailsReducer from '@/redux/sagas/movie-details/movie-details.reducers';

export default combineReducers({
  moviesList: moviesReducer.movies,
  genresList: moviesReducer.genres,
  movieDetails: movieDetailsReducer
});