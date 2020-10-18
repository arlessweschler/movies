import { actionKeys } from 'app_redux/sagas/movie-details/movie-details.actions';
import { createAsyncReducer, } from 'app_redux/helpers/reducers.helper';

const movieDetailsReducer = {
  movie: createAsyncReducer(actionKeys.GET_MOVIE_DETAILS)
};

console.warn('-- sagas/movie-details/movie-details.reducers.js, movieDetailsReducer {}');


export default movieDetailsReducer;