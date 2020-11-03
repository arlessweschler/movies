import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getQueryParams } from 'app_services/UtilsService';
import { MDetailsContainer } from 'app_containers';
import {
  getMovieDetails,
  getCredits,
  getVideos,
  getImages,
  getGenres,
  getRecommendations,
} from 'redux_actions';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getMovieDetails,
      getCredits,
      getVideos,
      getImages,
      getGenres,
      getRecommendations,
    }, dispatch)
  };
};

// контейнер маршрута
class MDetailsRouteContainer extends Component {

  // получение данных для отправки разметки с данными при серверном рендеринге
  static fetchData(store, url, urlParams) {
    console.log('\n--MDetailsRouteContainer.fetchData(), url:', url);

    const movie_id = urlParams[0].split('/').pop();
    const { lng } = getQueryParams(url.split('?').pop());

    console.log('movie_id:', movie_id);
    console.log('lng:', lng);

    const methods = [getMovieDetails, getCredits, getVideos, getImages, getGenres, getRecommendations];

    methods.forEach((method) => {
      store.dispatch(method({ movie_id, lng }));
    });
  }

  render() {
    return <MDetailsContainer />;
  }
};

export default connect(() => ({}), mapDispatchToProps)(MDetailsRouteContainer);