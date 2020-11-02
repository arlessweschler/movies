import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import PTS from 'app_services/PropTypesService';
import { isEmpty, hasRequestDiffs } from 'app_services/UtilsService';
import { MoviesPage } from 'app_components/pages';
import { ProgressBar } from 'app_components/layout';

import {
  getMovies
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
      getMovies
    }, dispatch)
  };
};

class MListContainer extends Component {

  componentDidUpdate(prevProps) {
    // console.warn('\n--MListContainer.componentDidUpdate()');

    const { moviesList, actions, location } = this.props;
    const { request } = moviesList;
    const checklist = ['lng', 'moviesType', 'page', 'search'];

    if ((location.search !== prevProps.location.search)) {
      if (hasRequestDiffs({ request, checklist })) {
        const params = qs.parse(location.search);
        actions.getMovies(params);
      };
    }
  }

  componentDidMount() {
    // console.warn('\n--MListContainer.componentDidMount()');

    const { moviesList, location, actions } = this.props;
    const { data, isLoading, request } = moviesList;
    const checklist = ['lng', 'moviesType', 'page', 'search'];

    if (
      (isEmpty(data.results) && !isLoading)
      || hasRequestDiffs({ request, checklist })
    ) {
      const params = qs.parse(location.search);
      actions.getMovies(params);
    };
  }

  render() {
    const { moviesList, location } = this.props;
    const { data, error, isLoading } = moviesList;

    const { search } = qs.parse(location.search);

    return (
      <Fragment>
        {isLoading && <ProgressBar />}

        <MoviesPage
          data_paging={{
            initialPage: (data.page - 1),
            pageCount: data.total_pages
          }}

          data_moviesList={{
            movies: data.results,
            error: error,
            search: search,
            total_results: data.total_results
          }}
        />
      </Fragment>
    );
  }
};

MListContainer.propTypes = {
  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getMovies: PT.func.isRequired
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
  }).isRequired
};

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withRouter(MListContainer));