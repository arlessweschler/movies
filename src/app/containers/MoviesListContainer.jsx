import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'query-string';


import { redirect, isEmpty } from 'app_services/Utils.service';
import { MoviesToolbar, MoviesPaging, MoviesList } from 'app_components/pages';
import { loadMoviesList } from "redux_actions"

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
      loadMoviesList
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MoviesListContainer extends Component {

  constructor() {
    super();
    this.getUrlParams = this.getUrlParams.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  static fetchData(store, urlParams, urlQuery) {
    return store.dispatch(loadMoviesList(urlQuery));
  }

  componentDidMount() {
    const { moviesType, page } = this.getUrlParams();
    const { moviesList, actions } = this.props;

    // запрашиваем фильмы, если их нет или если есть фильтр из url и список имеющихся фильмов отличается от их типа фильтрации
    if (isEmpty(moviesList.movies.results)) {
      actions.loadMoviesList({ moviesType, page });
    };
  }

  getUrlParams() {
    return qs.parse(this.props.history.location.search);
  }

  handleFilter(moviesType) {
    redirect(`/movies?moviesType=${moviesType}`);
    this.props.actions.loadMoviesList({ moviesType });
  }

  onPageChange({ selected }) {
    const { moviesType } = this.getUrlParams();
    const urlParams = { moviesType, page: selected + 1 };

    redirect(`/movies?${qs.stringify(urlParams)}`);
    this.props.actions.loadMoviesList(urlParams);
  }

  render() {
    const { moviesList, moviesGenres } = this.props;
    const { movies, isLoading, error } = moviesList;

    const { moviesType } = this.getUrlParams();

    return (
      <React.Fragment>
        <MoviesToolbar
          activeFilter={moviesType}
          handleFilter={this.handleFilter}
        />
        <MoviesPaging
          pageCount={movies.total_pages}
          initialPage={movies.page - 1}
          onPageChange={this.onPageChange}
        />
        <MoviesList
          genres={moviesGenres.genres}
          movies={movies.results}
          isLoading={isLoading}
          error={error}
        />
      </React.Fragment>
    );
  }
};