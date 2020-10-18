import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PTS from 'app_services/PropTypesService';
import { MovieCard, Credits } from 'app_components/pages';
import {
  getMovieDetails,
  getCredits
} from 'redux_actions';
import { CrewContextProvider } from 'app_contexts/CrewContext';

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
      getMovieDetails,
      getCredits
    }, dispatch)
  };
};

class MovieCardContainer extends Component {
  componentDidMount() {
    const { actions, match } = this.props;
    const { movie_id } = match.params;

    console.log('-- MovieCardContainer.componentDidMount(), movie_id:', movie_id);

    actions.getMovieDetails(movie_id);
    actions.getCredits(movie_id);
  }

  render() {
    const { movieDetails } = this.props;
    const { movie, credits } = movieDetails;

    // console.log('-- MovieCardContainer.render(), movieDetails:', movieDetails);

    return (
      <Fragment>
        <CrewContextProvider
          value={credits.data}
        >
          <MovieCard movie={movie.data} />
        </CrewContextProvider>
        <Credits credits={credits.data} />
      </Fragment>
    );
  }
};

MovieCardContainer.propTypes = {
  movieDetails: PT.shape({
    movie: PT.shape({
      isLoading: PT.bool.isRequired,
      error: PTS.nullOrString,
      data: PT.object.isRequired
    }).isRequired,

    credits: PT.shape({
      isLoading: PT.bool.isRequired,
      error: PTS.nullOrString,
      data: PT.object.isRequired
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCardContainer);