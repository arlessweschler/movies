import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getQueryParams } from '@/utils/url';
import MoviesListContainer from '@/containers/features/MoviesListContainer';
import {
  getMovies,
  getGenres
} from '@/actions';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getMovies,
    getGenres
  }, dispatch)
});

// API data prefetching (used in SSR mode)
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