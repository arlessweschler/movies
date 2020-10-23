import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PTS from 'app_services/PropTypesService';
import { isEmpty } from 'app_services/UtilsService';
import { MoviePage } from 'app_components/pages';
import { MDetailsContextProvider } from 'app_contexts/MDetailsContext';
import {
  getMovieDetails,
  getCredits,
  getVideos
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
      getMovieDetails,
      getCredits,
      getVideos
    }, dispatch)
  };
};

class MDetailsContainer extends Component {

  static fetchData(store, urlParams) {
    const movie_id = urlParams[0].split('/').pop();

    store.dispatch(getMovieDetails(movie_id));
    store.dispatch(getCredits(movie_id));
    store.dispatch(getVideos(movie_id));
  }

  componentDidMount() {
    const { actions, match, movieDetails } = this.props;
    const { movie, credits, videos } = movieDetails;
    const { movie_id } = match.params;
    const emptyOrPrevious = (data) => isEmpty(data) || (movie_id != movie.data.id);

    if (emptyOrPrevious(movie.data)) {
      actions.getMovieDetails(movie_id);
    }

    if (emptyOrPrevious(credits.data)) {
      actions.getCredits(movie_id);
    }

    if (emptyOrPrevious(videos.data)) {
      actions.getVideos(movie_id);
    }
  }

  render() {
    const { movieDetails } = this.props;
    const { movie, credits, videos } = movieDetails;

    // console.log('-- MDetailsContainer.render(), movieDetails:', movieDetails);

    return (
      <MDetailsContextProvider
        credits={credits.data}
        videos={videos.data}
        movie={movie.data}
      >
        <MoviePage
          movie={movie.data}
          isLoading={movie.isLoading}
        />
      </MDetailsContextProvider>
    );
  }
};

MDetailsContainer.propTypes = {
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
    }).isRequired,

    videos: PT.shape({
      isLoading: PT.bool.isRequired,
      error: PTS.nullOrString,
      data: PT.array.isRequired
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MDetailsContainer);