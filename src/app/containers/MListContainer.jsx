import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import PTS from 'app_services/PropTypesService';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';
import { DEFAULT_LANGUAGE } from 'app_i18n';
import { redirect } from 'app_history';
import { isEmpty, getDiffMethod, difference } from 'app_services/UtilsService';
import { MoviesPage } from 'app_components/pages';
import { ProgressBar } from 'app_components/layout';

import {
  getMovies,
  resetMovies
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
      resetMovies
    }, dispatch)
  };
};

class MListContainer extends Component {
  constructor() {
    super();
    this.handleFilter = this.handleFilter.bind(this);
    this.hasUrlQueryDiffs = this.hasUrlQueryDiffs.bind(this);
    this.update = this.update.bind(this);
  }

  /*   componentWillUnmount() {
      console.warn('\n --MListContainer.componentWillUnmount');
    } */

  /*   shouldComponentUpdate(nextProps, nextState) {
      console.warn('\n --MListContainer.shouldComponentUpdate()');
      return true;
    } */

  componentDidUpdate(prevProps) {
    // console.warn('\n--MListContainer.componentDidUpdate()');

    // const diffs = difference(this.props, prevProps);
    // console.log('difference:', diffs);

    const { moviesList, actions, location } = this.props;
    const searchObject = qs.parse(location.search);

    if ((prevProps.location.search !== this.props.location.search)) {
      if (this.hasUrlQueryDiffs(moviesList.request, 'getMovies check')) {
        actions.getMovies(searchObject);
      };
    }
  }

  componentDidMount() {
    // console.warn('\n--MListContainer.componentDidMount()');

    const { moviesList, history, actions } = this.props;
    const searchObject = qs.parse(history.location.search);

    if (
      isEmpty(moviesList.data.results)
      || this.hasUrlQueryDiffs(moviesList.request, 'getMovies check')
    ) {
      actions.getMovies(searchObject);
    };
  }

  // проверяем различия параметров последнего запроса (ключи объекта request) в store с: 
  // 1. значениями этих параметров из url search query или 
  // (опционально) 2. дефолтными значениями этих из редюсера
  hasUrlQueryDiffs(request, message, list) {
    if (message) {
      message = `MListContainer, ${message}`
    }
    const checkDiffs = getDiffMethod(request, message);

    let params = [
      { key: 'lng', defaultValue: DEFAULT_LANGUAGE.value },
      { key: 'page', defaultValue: 1 },
      { key: 'moviesType', defaultValue: DEFAULT_MOVIES_TYPE },
      { key: 'search', defaultValue: '' }
    ];

    if (list) {
      params = params.filter(i => list.includes(i.key));
    }

    return params.some(
      (item) => checkDiffs(item.key, {
        withDefault: true,
        defaultValue: item.defaultValue
      })
    );
  }

  update(nextValues) {
    const { history, actions } = this.props;
    const values = qs.parse(history.location.search);
    const nextParams = { ...values, ...nextValues };

    redirect(`/?${qs.stringify(nextParams)}`);
    // actions.getMovies(nextParams);
  }

  handleFilter(moviesType) {
    this.update({ moviesType, page: 1 })
  }

  render() {
    const { moviesList, history } = this.props;
    const { data, error } = moviesList;

    const { moviesType, search } = qs.parse(history.location.search);

    return (
      <Fragment>
        {moviesList.isLoading && <ProgressBar />}

        <MoviesPage
          data_toolbar={{
            activeFilter: moviesType,
            handleFilter: this.handleFilter,
            showToolbar: !search
          }}

          data_paging={{
            initialPage: (data.page - 1),
            pageCount: data.total_pages
          }}

          data_moviesList={{
            movies: data.results,
            error: error,
            search: search,
            total_results: data.total_results,
            isLoading: data.isLoading
          }}
        />
      </Fragment>
    );
  }
};

MListContainer.propTypes = {
  history: PT.shape({
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired
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