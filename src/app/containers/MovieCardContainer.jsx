import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MovieCard } from 'app_components/pages';
import {
  getMovies,
  getGenres
} from 'redux_actions';


// маппинг редюсеров
const mapStateToProps = ({ moviesGenres, moviesList }) => {
  return {
    moviesGenres,
    moviesList
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getMovies,
      getGenres
    }, dispatch)
  };
};

class MovieCardContainer extends Component {
  render() {
    const { moviesList, moviesGenres } = this.props;

    return (
      <Fragment>
        <MovieCard />
      </Fragment>
    );
  }
};

MovieCardContainer.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCardContainer);