import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getQueryParams } from '@/services/UtilsService';
import MoviesListContainer from '@/containers/features/MoviesListContainer';
import {
  getMovies,
  getGenres
} from '@/redux/actions';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getMovies,
    getGenres
  }, dispatch)
});

// получение данных для отправки разметки с данными при серверном рендеринге
class MoviesRouteContainer extends Component {
  static fetchData(store, url) {
    const queryParams = getQueryParams(url.split('?').pop());

    store.dispatch(getGenres(queryParams));
    store.dispatch(getMovies(queryParams));
  }

  render() {
    return <MoviesListContainer />;
  }
}

export default connect(() => ({}), mapDispatchToProps)(MoviesRouteContainer);