import ApiService from 'app_services/ApiMovies.service';

import {
  DEFAULT_MOVIES_LIST
} from 'app_redux/movies-list/movies-list.reducer';

import {
  MOVIES_LIST_IS_LOADING,
  MOVIES_LIST_LOADING_SUCCESS,
  MOVIES_LIST_LOADING_ERROR
} from 'app_redux/movies-list/movies-list.constants';

import {
  MOVIES_GENRES_IS_LOADING,
  MOVIES_GENRES_LOADING_SUCCESS,
  MOVIES_GENRES_LOADING_ERROR
} from 'app_redux/movies-genres/movies-genres.constants';

function setSuccesGenres({ data }) {
  return {
    type: MOVIES_GENRES_LOADING_SUCCESS,
    genresWasFetched: true,
    genresIsLoading: false,
    genresHasErrors: false,
    data
  };
}

function setSuccesMovies({ data, moviesFetchedType, filter }) {
  return {
    type: MOVIES_LIST_LOADING_SUCCESS,
    moviesWasFetched: true,
    moviesIsLoading: false,
    moviesHasErrors: false,
    data,
    moviesFetchedType,
    filter
  };
}

function setLoadingMovies(moviesIsLoading) {
  return {
    type: MOVIES_LIST_IS_LOADING,
    moviesIsLoading
  };
}

function setLoadingGenres(genresIsLoading) {
  return {
    type: MOVIES_GENRES_IS_LOADING,
    genresIsLoading
  };
}

function setErrorMovies(moviesHasErrors) {
  return {
    type: MOVIES_LIST_LOADING_ERROR,
    moviesIsLoading: false,
    moviesHasErrors
  };
}

function setErrorGenres(genresHasErrors) {
  return {
    type: MOVIES_GENRES_LOADING_ERROR,
    genresIsLoading: false,
    genresHasErrors
  };
}

function loadMoviesList(moviesParams = {}) {
  return async (dispatch, getState) => {
    const { moviesGenres } = getState();

    // список жанров фильмов
    if (!moviesGenres.genresWasFetched) {
      try {
        dispatch(setLoadingGenres(true));

        const responseGenres = await ApiService.fetch({ url: '/genre/movie/list' });

        let dataGenres;
        if (responseGenres.ok) {
          dataGenres = await responseGenres.json();
          dispatch(setSuccesGenres({
            data: dataGenres
          }));
        } else {
          dataGenres = await responseGenres.text().then(text => { throw new Error(text) });
        }
      } catch (error) {
        const { message } = error;
        dispatch(setErrorGenres({ url, message }));
      }
    }

    // список фильмов
    const {
      page = DEFAULT_MOVIES_LIST.movies.page,
      moviesType = DEFAULT_MOVIES_LIST.filter
    } = moviesParams;
    const url = `/movie/${moviesType}`;
    const urlParams = `&page=${page}`;

    try {
      dispatch(setLoadingMovies(true));

      const responseMovies = await ApiService.fetch({ url, urlParams });

      let dataMovies;
      if (responseMovies.ok) {
        dataMovies = await responseMovies.json();
        dispatch(setSuccesMovies({
          data: dataMovies,
          moviesFetchedType: moviesType,
          filter: moviesType
        }));
      } else {
        dataMovies = await responseMovies.text().then(text => { throw new Error(text) });
      }

    } catch (error) {
      const { message } = error;
      dispatch(setErrorMovies({ url, message }));
    }
  };

}

export {
  loadMoviesList
};