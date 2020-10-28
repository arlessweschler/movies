import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';

import PTS from 'app_services/PropTypesService';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';
import { DEFAULT_LANGUAGE } from 'app_i18n';
import { redirect } from 'app_history';
import { isEmpty, getDiffMethod } from 'app_services/UtilsService';
import { MoviesPage } from 'app_components/pages';

import {
  getMovies,
  getGenres,
  resetMovieDetails
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ moviesList }) => {
  return {
    moviesList
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getMovies,
      getGenres,
      resetMovieDetails
    }, dispatch)
  };
};

class MListContainer extends Component {
  constructor() {
    super();
    this.handleFilter = this.handleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.linkMovie = this.linkMovie.bind(this);
    this.hasUrlQueryDiffs = this.hasUrlQueryDiffs.bind(this);
    this.update = this.update.bind(this);
  }

  static fetchData(store, urlParams, urlQuery) {
    console.log('-- MListContainer.fetchData(), urlQuery:', urlQuery);

    store.dispatch(getGenres(urlQuery));
    store.dispatch(getMovies(urlQuery));
  }

  componentWillUnmount() {
    // console.warn('\n -- MListContainer.componentWillUnmount');
  }

  componentDidUpdate() {
    // console.warn('\n -- MListContainer.componentDidUpdate()');
    const { moviesList, actions, history } = this.props;
    const { movies, genres } = moviesList;
    const searchObject = qs.parse(history.location.search);

    if (this.hasUrlQueryDiffs(genres.request, ['lng'])) {
      actions.getGenres(searchObject);
    };

    if (this.hasUrlQueryDiffs(movies.request)) {
      actions.getMovies(searchObject);
    };
  }

/*   shouldComponentUpdate(nextProps, nextState) {
    console.warn('\n -- MListContainer.shouldComponentUpdate()');

    const { moviesList, history } = this.props;
    const { movies, genres } = moviesList;

    const { moviesList: nextMoviesList, history:nextHistory } = nextProps;
    const {
      movies: nextMovies,
      genres: nextGenres
    } = nextMoviesList;

    const searchObject = history.location.search;
    const nextSearchObject = nextHistory.location.search;

    const moviesHasLoaded = movies.isLoading && !nextMovies.isLoading;
    const genresHasLoaded = genres.isLoading && !nextGenres.isLoading;
    
    console.log('searchObject:', searchObject);
    console.log('nextSearchObject:', nextSearchObject);

    // return moviesHasLoaded || genresHasLoaded;
    return true;
  } */

  componentDidMount() {
    // console.log('\n -- MListContainer.componentDidMount()');

    const { moviesList, history, actions } = this.props;
    const { movies, genres } = moviesList;
    const searchObject = qs.parse(history.location.search);

    if (isEmpty(genres.data) ||
      this.hasUrlQueryDiffs(genres.request, ['lng'])) {
      actions.getGenres(searchObject);
    };

    if (isEmpty(movies.data.results) || this.hasUrlQueryDiffs(movies.request)) {
      actions.getMovies(searchObject);
    };
  }

  // проверяем различия параметров последнего запроса (ключи объекта request) в store с: 
  // 1. значениями этих параметров из url search query или 
  // (опционально) 2. дефолтными значениями этих из редюсера
  hasUrlQueryDiffs(request, list) {
    const hasDiffs = getDiffMethod(request);

    let params = [
      { key: 'lng', defaultValue: DEFAULT_LANGUAGE.value },
      { key: 'page', defaultValue: 1 },
      { key: 'moviesType', defaultValue: DEFAULT_MOVIES_TYPE }
    ];

    if (list) {
      params = params.filter(i => list.includes(i.key));
    }

    return params.some(
      (item) => hasDiffs(item.key, {
        withDefault: true,
        defaultValue: item.defaultValue
      })
    );
  }

  linkMovie(id) {
    const { history, actions } = this.props;
    const { lng } = qs.parse(history.location.search);
    const nextParams = { lng };

    actions.resetMovieDetails();
    redirect(`/movies/${id}?${qs.stringify(nextParams)}`);
  }

  update(nextValues) {
    const { history, actions } = this.props;
    const values = qs.parse(history.location.search);
    const nextParams = { ...values, ...nextValues };

    redirect(`/movies?${qs.stringify(nextParams)}`);
    actions.getMovies(nextParams);
  }

  handleFilter(moviesType) {
    this.update({ moviesType, page: 1 })
  }

  onPageChange({ selected }) {
    this.update({ page: selected + 1 })
  }

  render() {
    const { moviesList, history } = this.props;
    const { movies, genres } = moviesList;
    const { data, isLoading, error } = movies;

    const { moviesType } = qs.parse(history.location.search);

    return (
      <MoviesPage
        data_toolbar={{
          activeFilter: moviesType,
          handleFilter: this.handleFilter
        }}

        data_paging={{
          initialPage: (data.page - 1),
          pageCount: data.total_pages,
          onPageChange: this.onPageChange
        }}

        data_genresContext={{
          genres: genres.data,
          linkMovie: this.linkMovie
        }}

        data_moviesList={{
          movies: data.results,
          isLoading: isLoading,
          error: error
        }}
      />
    );
  }
};

MListContainer.propTypes = {
  actions: PT.shape({
    getMovies: PT.func.isRequired,
    getGenres: PT.func.isRequired,
  }).isRequired,

  moviesList: PT.shape({
    movies: PT.shape({
      isLoading: PT.bool.isRequired,
      error: PTS.nullOrString,
      data: PT.shape({
        page: PT.number.isRequired,
        total_pages: PTS.nullOrNumber,
        total_results: PTS.nullOrNumber,
        results: PT.array.isRequired,
      }).isRequired
    }).isRequired,

    genres: PT.shape({
      data: PT.array.isRequired
    }).isRequired,
  }).isRequired,

  history: PT.shape({
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MListContainer);