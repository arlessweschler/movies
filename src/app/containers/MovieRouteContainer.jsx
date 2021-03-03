import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getQueryParams } from '@/utils/url';
import MovieDetailsContainer from '@/containers/features/MovieDetailsContainer';
import {
  getDetails, getCredits, getVideos,
  getImages, getGenres, getRecomms
} from '@/actions';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDetails,
    getCredits,
    getVideos,
    getImages,
    getGenres,
    getRecomms,
  }, dispatch)
});

// API data prefetching (used in SSR mode)
class MovieRouteContainer extends Component {
  static fetchData(store, url, urlParams) {
    const movieId = urlParams[0].split('/').pop();
    const { lng } = getQueryParams(url.split('?').pop());

    const methods = [getDetails, getCredits, getVideos, getImages, getGenres, getRecomms];

    methods.forEach((method) => {
      store.dispatch(method({ movieId, lng }));
    });
  }

  render() {
    return <MovieDetailsContainer />;
  }
}

export default connect(() => ({}), mapDispatchToProps)(MovieRouteContainer);