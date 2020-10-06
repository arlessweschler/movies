import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MoviesTopFilter, MoviesList } from 'app_components/pages';
import {
  redirect,
  loadMoviesList,
  setMoviesFilter
} from "redux_actions"

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
      redirect,
      loadMoviesList,
      setMoviesFilter
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MoviesListContainer extends Component {

  constructor() {
    super();
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    const { moviesList, actions } = this.props;
    const { listWasFetched } = moviesList;
    if (!listWasFetched) actions.loadMoviesList();
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

  render() {
    const { moviesList } = this.props;
    const { list, isLoading, hasErrors, filter } = moviesList;

    const hasData = (typeof list !== 'undefined') && (list.length > 0);
    let listProps = {};

    if (isLoading) listProps.message = 'Загрузка...';
    if (hasData) listProps.list = list;
    if (hasErrors) listProps.message = hasErrors.message;

    return (
      <React.Fragment>
        <MoviesTopFilter
          filters={this.getFilters()}
          activeFilter={filter}
          handleFilter={this.handleFilter}
        />
        <MoviesList {...listProps} />
      </React.Fragment>
    );
  }
};