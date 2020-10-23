import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';


import { redirect } from 'app_history';
import { isEmpty } from 'app_services/UtilsService';
import PTS from 'app_services/PropTypesService';
import { MoviesToolbar, MoviesPaging, MoviesList } from
  'app_components/pages';
import { MoviesListContextProvider } from 'app_contexts/MoviesListContext';
import { Row, Column } from 'app_components/layout';

import {
  getMovies,
  getGenres,
  resetMovieDetails
} from 'redux_actions';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';

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

class MoviesListContainer extends Component {
  constructor() {
    super();
    this.getUrlParams = this.getUrlParams.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.linkMovie = this.linkMovie.bind(this);
  }

  static fetchData(store, urlParams, urlQuery) {
    store.dispatch(getGenres());
    store.dispatch(getMovies(urlQuery));
  }

  componentDidMount() {
    const { moviesType, page } = this.getUrlParams();
    const { moviesList, moviesGenres, actions } = this.props;
    const { data, request } = moviesList

    if (isEmpty(moviesGenres.data)) {
      actions.getGenres();
    };

    // запрашиваем фильмы, если их нет или если фильтр в url отличается от фильтра последнего запроса на список фильмов 
    if (
      isEmpty(data.results) ||
      (moviesType && moviesType !== request.moviesType) ||
      (!moviesType && request.moviesType !== DEFAULT_MOVIES_TYPE)
    ) {
      actions.getMovies({ moviesType, page });
    };
  }

  getUrlParams() {
    return qs.parse(this.props.history.location.search);
  }

  handleFilter(moviesType) {
    redirect(`/movies?moviesType=${moviesType}`);
    this.props.actions.getMovies({ moviesType });
  }

  onPageChange({ selected }) {
    const { moviesType } = this.getUrlParams();
    const urlParams = { moviesType, page: selected + 1 };

    redirect(`/movies?${qs.stringify(urlParams)}`);
    this.props.actions.getMovies(urlParams);
  }

  linkMovie(id) {
    this.props.actions.resetMovieDetails();
    redirect(`/movies/${id}`);
  }

  render() {
    const { moviesList, moviesGenres } = this.props;
    const { data, isLoading, error } = moviesList;

    const { moviesType } = this.getUrlParams();

    return (
      <Fragment>
        <Row cls="mb-2">
          <MoviesToolbar
            activeFilter={moviesType}
            handleFilter={this.handleFilter}
          />
        </Row>

        <Row cls="mb-2">
          <MoviesPaging
            initialPage={data.page - 1}
            pageCount={data.total_pages}
            onPageChange={this.onPageChange}
          />
        </Row>

        <MoviesListContextProvider
          genres={moviesGenres.data}
          linkMovie={this.linkMovie}
        >
          <Row>
            <MoviesList
              movies={data.results}
              isLoading={isLoading}
              error={error}
            />
          </Row>
        </MoviesListContextProvider>
      </Fragment>
    );
  }
};

MoviesListContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MoviesListContainer);