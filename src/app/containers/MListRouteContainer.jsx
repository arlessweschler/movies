import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
  static fetchData(store, urlParams, urlQuery) {
    console.log('\n--MListRouteContainer.fetchData(), urlQuery:', urlQuery);

    store.dispatch(getGenres(urlQuery));
    store.dispatch(getMovies(urlQuery));
  }

  render() {
    return <MListContainer />;
  }
};

export default connect(() => ({}), mapDispatchToProps)(MListRouteContainer);