import ApiService from 'app_services/ApiMovies.service';

import {
  MOVIES_LIST_IS_LOADING,
  MOVIES_LIST_LOADING_SUCCESS,
  MOVIES_LIST_LOADING_ERROR,
  MOVIES_FILTER_UPDATED
} from './movies-list.constants';

function setMoviesFilter(filter) {
  return {
    type: MOVIES_FILTER_UPDATED,
    filter
  };
}

function setError(moviesHasErrors) {
  return {
    type: MOVIES_LIST_LOADING_ERROR,
    moviesIsLoading: false,
    moviesHasErrors
  };
}

function setSucces({ data, moviesFetchedType }) {
  return {
    type: MOVIES_LIST_LOADING_SUCCESS,
    moviesWasFetched: true,
    moviesIsLoading: false,
    moviesHasErrors: false,
    data,
    moviesFetchedType
  };
}

function setLoading(moviesIsLoading) {
  return {
    type: MOVIES_LIST_IS_LOADING,
    moviesIsLoading
  };
}

function loadMoviesList() {
  return (dispatch, getState) => {
    const { moviesList: { filter }, } = getState();
    const url = `/movie/${filter.key}`;
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
      .then((data) => dispatch(setSucces({ data, moviesFetchedType: filter.key })))
      .catch(({ message }) => {
        return dispatch(setError({ url, message }));
      });


  };
}

export {
  loadMoviesList,
  setMoviesFilter
};