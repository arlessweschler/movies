import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MoviesTopFilter, MoviesList } from 'app_components/pages';
import {
  redirect,
  loadMoviesGenres,
  loadMoviesList,
  setMoviesFilter
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
      loadMoviesGenres,
      loadMoviesList,
      setMoviesFilter
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MoviesListContainer extends Component {

  constructor() {
    super();
    this.getMoviesListParams = this.getMoviesListParams.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    const { moviesList, moviesGenres, actions } = this.props;

    if (!moviesGenres.genresWasFetched) actions.loadMoviesGenres();
    if (!moviesList.moviesWasFetched) actions.loadMoviesList();
  }

  getFilters() {
    return [
      { key: "now_playing", value: "Сейчас в кино" },
      { key: "popular", value: "Популярные" },
      { key: "top_rated", value: "Лучшие" }
    ];
  }

  handleFilter(filter) {
    this.props.actions.setMoviesFilter(filter);
    this.props.actions.loadMoviesList();
  }

  getMoviesListParams() {
    const { moviesList, moviesGenres } = this.props;
    const { movies, moviesIsLoading, moviesHasErrors } = moviesList;

    const hasMovies = (typeof movies !== 'undefined') && (movies.length > 0);
    let params = {};

    if (moviesIsLoading) params.message = 'Загрузка...';
    if (hasMovies) params.movies = movies;
    if (moviesHasErrors) params.message = moviesHasErrors.message;

    const { genres } =   moviesGenres
    ;

    const hasGenres = (typeof genres !== 'undefined') && (genres.length > 0);
    if (hasGenres) params.genres = genres;

    return params;
  }

  render() {
    return (
      <React.Fragment>
        <MoviesTopFilter
          filters={this.getFilters()}
          activeFilter={this.props.moviesList.filter}
          handleFilter={this.handleFilter}
        />
        <MoviesList {...this.getMoviesListParams()} />
      </React.Fragment>
    );
  }
};