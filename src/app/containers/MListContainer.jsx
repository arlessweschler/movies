import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';

import PTS from 'app_services/PropTypesService';
import { redirect } from 'app_history';
import { isEmpty } from 'app_services/UtilsService';
import { MoviesPage } from 'app_components/pages';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';

import {
  getMovies,
  getGenres,
  resetMovieDetails
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ moviesGenres, moviesList }) => {
  return {
    moviesGenres,
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
    this.geUrlSearchObject = this.geUrlSearchObject.bind(this);
    this.hasDiffs = this.hasDiffs.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.linkMovie = this.linkMovie.bind(this);
  }

  static fetchData(store, urlParams, urlQuery) {
    store.dispatch(getGenres());
    store.dispatch(getMovies(urlQuery));
  }

  componentDidUpdate() {
    const searchObject = this.geUrlSearchObject();
    const { actions } = this.props;

    if (this.hasDiffs('lng')) {
      actions.getMovies(searchObject);
    };
  }

  componentDidMount() {
    const searchObject = this.geUrlSearchObject();
    const { moviesList, moviesGenres, actions } = this.props;

    if (isEmpty(moviesGenres.data)) {
      actions.getGenres();
    };

    // запрашиваем фильмы, если их нет или если есть разлчия параметров последнего запроса (ключи объекта request) в store с: 
    // 1. значениями этих параметров из url search query или 
    // (опционально) 2. дефолтными значениями этих из редюсера
    if (
      isEmpty(moviesList.data.results) ||
      this.hasDiffs('lng') ||
      this.hasDiffs('moviesType', {
        compareWithDefault: true,
        defaultValue: DEFAULT_MOVIES_TYPE
      })
    ) {
      actions.getMovies(searchObject);
    };
  }

  hasDiffs(key, options = {}) {
    const {
      compareWithDefault = false,
      defaultValue = null
    } = options;

    const searchObject = this.geUrlSearchObject();
    const { moviesList: { request } } = this.props;

    const sValue = searchObject[key];
    const rValue = request[key];

    const searchQueryDiff = Boolean(sValue && sValue !== rValue);

    const defaultDiff = compareWithDefault
      ? Boolean(typeof sValue == 'undefined' && rValue !== defaultValue)
      : false;

    return searchQueryDiff || defaultDiff;
  }

  geUrlSearchObject() {
    return qs.parse(this.props.history.location.search);
  }

  handleFilter(moviesType) {
    const { lng } = this.geUrlSearchObject();
    const nextSearchObj = { lng, moviesType };

    redirect(`/movies?${qs.stringify(nextSearchObj)}`);
    this.props.actions.getMovies(nextSearchObj);
  }

  onPageChange({ selected }) {
    const searchObj = this.geUrlSearchObject();

    const nextSearchObj = {
      ...searchObj,
      page: selected + 1
    };

    redirect(`/movies?${qs.stringify(nextSearchObj)}`);
    this.props.actions.getMovies(nextSearchObj);
  }

  linkMovie(id) {
    const { lng } = this.geUrlSearchObject();
    const nextSearchObj = { lng };

    this.props.actions.resetMovieDetails();
    redirect(`/movies/${id}?${qs.stringify(nextSearchObj)}`);
  }

  render() {
    const { moviesList, moviesGenres } = this.props;
    const { data, isLoading, error } = moviesList;

    const { moviesType } = this.geUrlSearchObject();

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
          genres: moviesGenres.data,
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
    isLoading: PT.bool.isRequired,
    error: PTS.nullOrString,
    data: PT.shape({
      page: PT.number.isRequired,
      total_pages: PTS.nullOrNumber,
      total_results: PTS.nullOrNumber,
      results: PT.array.isRequired,
    }).isRequired
  }).isRequired,

  moviesGenres: PT.shape({
    data: PT.array.isRequired
  }).isRequired,

  history: PT.shape({
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MListContainer);