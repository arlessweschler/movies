import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
  static fetchData(store, urlParams, urlQuery) {
    console.log('\n--MDetailsRouteContainer.fetchData(), urlQuery:', urlQuery);

    const movieId = urlParams[0].split('/').pop();
    const methods = [getMovieDetails, getCredits, getVideos, getImages, getGenres, getRecommendations];

    methods.forEach((method) => {
      store.dispatch(method({ movieId, ...urlQuery }));
    });
  }

  render() {
    return <MDetailsContainer />;
  }
};

export default connect(() => ({}), mapDispatchToProps)(MDetailsRouteContainer);