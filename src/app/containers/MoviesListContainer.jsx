import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MoviesPage } from 'app_components/pages';
import {
  redirect,
  loadMoviesList
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
      loadMoviesList
    }, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MoviesListContainer extends Component {

  componentDidMount() {
    const { moviesList, actions } = this.props;
    const { listWasFetched } = moviesList;
    if (!listWasFetched) actions.loadMoviesList();
  }

  render() {
    const { moviesList } = this.props;
    const { list, isLoading, hasErrors } = moviesList;

    const hasData = (typeof list !== 'undefined') && (list.length > 0);
    let pageData = {};

    if (isLoading) pageData.message = 'Загрузка...';
    if (hasData) pageData.list = list;
    if (hasErrors) pageData.message = hasErrors.message;

    return <MoviesPage {...pageData} />;
  }
};