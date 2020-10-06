import ApiService from 'app_services/ApiMovies.service';

import {
  MOVIES_GENRES_IS_LOADING,
  MOVIES_GENRES_LOADING_SUCCESS,
  MOVIES_GENRES_LOADING_ERROR
} from './movies-genres.constants';

function setError(genresHasErrors) {
  return {
    type: MOVIES_GENRES_LOADING_ERROR,
    genresIsLoading: false,
    genresHasErrors
  };
}

function setSucces(data) {
  return {
    type: MOVIES_GENRES_LOADING_SUCCESS,
    genresWasFetched: true,
    genresIsLoading: false,
    genresHasErrors: false,
    data
  };
}

function setLoading(genresIsLoading) {
  return {
    type: MOVIES_GENRES_IS_LOADING,
    genresIsLoading
  };
}

function loadMoviesGenres() {
  return (dispatch, getState) => {
    const url = '/genre/movie/list';
    dispatch(setLoading(true));
    
    return ApiService.fetch({ url })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => dispatch(setSucces(data)))
      .catch(({ message }) => {
        return dispatch(setError({ url, message }));
      });


  };
}

export {
  loadMoviesGenres
};