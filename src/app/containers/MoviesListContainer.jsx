import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';


import { redirect } from 'app_history';
import { isEmpty } from 'app_services/UtilsService';
import PTS from 'app_services/PropTypesService';
import { MoviesToolbar, MoviesPaging, MoviesList } from 'app_components/pages';
import {
  getMovies,
  getGenres
} from 'redux_actions';
import { GenresContextProvider } from 'app_contexts/GenresContext';

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
      getGenres
    }, dispatch)
  };
};

class MoviesListContainer extends Component {
  constructor() {
    super();
    this.getUrlParams = this.getUrlParams.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  static fetchData(store, urlParams, urlQuery) {
    store.dispatch(getGenres());
    store.dispatch(getMovies(urlQuery));
  }

  componentDidMount() {
    const { moviesType, page } = this.getUrlParams();
    const { moviesList, moviesGenres, actions } = this.props;

    if (isEmpty(moviesGenres.data)) {
      actions.getGenres();
    };

    // запрашиваем фильмы, если их нет или если есть фильтр из url и список имеющихся фильмов отличается от их типа фильтрации
    if (isEmpty(moviesList.data.results)) {
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

  render() {
    const { moviesList, moviesGenres } = this.props;
    const { data, isLoading, error } = moviesList;

    const { moviesType } = this.getUrlParams();

    return (
      <Fragment>
        <MoviesToolbar
          activeFilter={moviesType}
          handleFilter={this.handleFilter}
        />
        <MoviesPaging
          initialPage={data.page - 1}
          pageCount={data.total_pages}
          onPageChange={this.onPageChange}
        />
        <GenresContextProvider
          value={moviesGenres.data}
        >
          <MoviesList
            movies={data.results}
            isLoading={isLoading}
            error={error}
          />
        </GenresContextProvider>
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