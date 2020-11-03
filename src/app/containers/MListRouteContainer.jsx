import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getQueryParams } from 'app_services/UtilsService';
import { MListContainer } from 'app_containers';
import {
  getMovies,
  getGenres
} from 'redux_actions';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getMovies,
      getGenres
    }, dispatch)
  };
};

// контейнер маршрута
class MListRouteContainer extends Component {

  // получение данных для отправки разметки с данными при серверном рендеринге
  static fetchData(store, url) {
    console.log('\n--MListRouteContainer.fetchData(), url:', url);

    const queryParams = getQueryParams(url.split('?').pop());
    console.log('queryParams:', queryParams);

    store.dispatch(getGenres(queryParams));
    store.dispatch(getMovies(queryParams));
  }

  render() {
    return <MListContainer />;
  }
};

export default connect(() => ({}), mapDispatchToProps)(MListRouteContainer);