import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { history } from 'redux_store';
import qs from 'query-string'

import { MOVIES_TYPES } from 'app_services/ApiMovies.service';
import { MoviesTopFilter, MoviesPaging, MoviesList } from 'app_components/pages';
import {
  redirect,
  loadMoviesList
} from "redux_actions"

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
      redirect,
      loadMoviesList
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MoviesListContainer extends Component {

  constructor() {
    super();
    this.getMoviesListParams = this.getMoviesListParams.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  static fetchData(store, urlParams, urlQuery) {
    return store.dispatch(loadMoviesList(urlQuery));
  }

  componentDidMount() {
    const { moviesType, page } = qs.parse(history.location.search);
    const { moviesList, actions } = this.props;
    const { moviesWasFetched, moviesFetchedType } = moviesList;

    // запрашиваем фильмы, если их нет или если есть фильтр из url и список имеющихся фильмов отличается от их типа фильтрации
    if (
      !moviesWasFetched ||
      (moviesType && (moviesFetchedType !== moviesType))
    ) {
      actions.loadMoviesList({ moviesType, page });
    };
  }

  getMoviesListParams() {
    const { moviesList, moviesGenres } = this.props;
    const { movies, moviesIsLoading, moviesHasErrors } = moviesList;
    const { genres } = moviesGenres;

    const hasMovies = (typeof movies.results !== 'undefined') && (movies.results.length > 0);
    let params = {};

    if (moviesIsLoading) params.message = 'Загрузка...';
    if (hasMovies) params.movies = movies.results;
    if (moviesHasErrors) params.message = moviesHasErrors.message;

    const hasGenres = (typeof genres !== 'undefined') && (genres.length > 0);
    if (hasGenres) params.genres = genres;

    return params;
  }

  handleFilter(moviesType) {
    const { pathname, search } = history.location;
    
    this.props.actions.redirect({
      fromURL: `${pathname}${search}`,
      toURL: `/movies?moviesType=${moviesType}`
    });
    this.props.actions.loadMoviesList({ moviesType });
  }

  onPageChange({ selected }) {
    const { moviesType } = qs.parse(history.location.search);

    const nextPage = selected + 1;
    const { pathname, search } = history.location;

    let queryParams = qs.parse(search);
    queryParams.page = nextPage;

    this.props.actions.redirect({
      fromURL: `${pathname}${search}`,
      toURL: `/movies?${qs.stringify(queryParams)}`
    });

    this.props.actions.loadMoviesList({ moviesType, page: nextPage });
  }

  render() {
    const { moviesList } = this.props;
    const { total_pages, page } = moviesList.movies;

    return (
      <React.Fragment>
        <MoviesTopFilter
          filters={MOVIES_TYPES}
          activeFilter={this.props.moviesList.filter}
          handleFilter={this.handleFilter}
        />
        <MoviesPaging
          pageCount={total_pages}
          initialPage={page - 1}
          onPageChange={this.onPageChange}
        />
        <MoviesList {...this.getMoviesListParams()} />
      </React.Fragment>
    );
  }
};