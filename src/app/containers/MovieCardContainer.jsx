import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PTS from 'app_services/PropTypesService';
import { MovieCard } from 'app_components/pages';
import {
  getMovieDetails
} from 'redux_actions';


// маппинг редюсеров
const mapStateToProps = ({ movieDetails }) => {
  return {
    movieDetails
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getMovieDetails
    }, dispatch)
  };
};

class MovieCardContainer extends Component {
  componentDidMount() {
    const { actions, match } = this.props;

    const { movie_id } = match.params;

    console.log('-- MovieCardContainer.componentDidMount(), movie_id:', movie_id);
    actions.getMovieDetails(movie_id);
  }

  render() {
    const { movieDetails } = this.props;
    const { data } = movieDetails;
    
    return (
      <Fragment>
        <MovieCard movie={data} />
      </Fragment>
    );
  }
};

MovieCardContainer.propTypes = {
  movieDetails: PT.shape({
    isLoading: PT.bool.isRequired,
    error: PTS.nullOrString,
    data: PT.object.isRequired
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCardContainer);