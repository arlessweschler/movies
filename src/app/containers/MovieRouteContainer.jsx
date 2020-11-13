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
    console.log('\n--MovieRouteContainer.fetchData(), url:', url);

    const movie_id = urlParams[0].split('/').pop();
    const { lng } = getQueryParams(url.split('?').pop());

    console.log('movie_id:', movie_id);
    console.log('lng:', lng);

    const methods = [getDetails, getCredits, getVideos, getImages, getGenres, getRecomms];

    methods.forEach((method) => {
      store.dispatch(method({ movie_id, lng }));
    });
  }

  render() {
    return <MovieDetailsContainer />;
  }
}

export default connect(() => ({}), mapDispatchToProps)(MovieRouteContainer);