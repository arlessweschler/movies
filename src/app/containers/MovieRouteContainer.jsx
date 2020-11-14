import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getQueryParams } from 'app_services/UtilsService';
import { MovieDetailsContainer } from 'app_containers';
import {
  getDetails,
  getCredits,
  getVideos,
  getImages,
  getGenres,
  getRecomms,
} from 'redux_actions';

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

// получение данных для отправки разметки с данными при серверном рендеринге
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