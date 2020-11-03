import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PTS from 'app_services/PropTypesService';
import { hasRequestDiffs, getQueryParams } from 'app_services/UtilsService';
import { MoviePage } from 'app_components/pages';
import { MDetailsContextProvider } from 'app_contexts';
import {
  getMovieDetails,
  getCredits,
  getVideos,
  getImages,
  getRecommendations
} from 'redux_actions';
import { ProgressBar } from 'app_components/layout';

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
      getVideos,
      getImages,
      getRecommendations
    }, dispatch)
  };
};

class MDetailsContainer extends Component {

  componentDidUpdate(prevProps) {
    // console.warn('\n--MDetailsContainer.componentDidUpdate()');

    const { movieDetails, location, match, actions } = this.props;
    const { lng } = getQueryParams();
    const { movie_id } = match.params;

    const list = [
      { name: 'movie', methodName: 'getMovieDetails' },
      { name: 'credits', methodName: 'getCredits' },
      { name: 'videos', methodName: 'getVideos' },
      { name: 'images', methodName: 'getImages' }
    ];

    let segment, request;
    
    if (
      (match.params !== prevProps.match.params)
      || (location.search !== prevProps.location.search)
    ) {
      list.forEach(({ name, methodName }) => {
        segment = movieDetails[name];
        request = segment.request;

        if (
          (movie_id != request.movie_id)
          || hasRequestDiffs({ request, checklist: ['lng', 'search'] })
        ) {
          actions[methodName]({ movie_id, lng });
        }
      });
    }
  }

  componentDidMount() {
    // console.warn('\n-- MDetailsContainer.componentDidMount()');

    const { actions, match, movieDetails } = this.props;
    const { movie_id } = match.params;
    const { lng } = getQueryParams();

    const list = [
      { name: 'movie', methodName: 'getMovieDetails' },
      { name: 'credits', methodName: 'getCredits' },
      { name: 'videos', methodName: 'getVideos' },
      { name: 'images', methodName: 'getImages' }
    ];

    let segment, request;
    list.forEach(({ name, methodName }) => {
      segment = movieDetails[name];
      request = segment.request;

      if (
        // isEmpty(segment.data) ||
        (movie_id != request.movie_id)
        || hasRequestDiffs({ request, checklist: ['lng'] })
      ) {
        actions[methodName]({ movie_id, lng });
      }
    });
  }

  render() {
    const { movieDetails } = this.props;
    const { movie, credits, videos, images } = movieDetails;

    return (
      <Fragment>
        {
          (movie.isLoading || credits.isLoading || videos.isLoading)
          && <ProgressBar />
        }
        <MDetailsContextProvider
          credits={credits.data}
          videos={videos.data}
          movie={movie.data}
          images={images.data}
        >
          <MoviePage movie={movie.data} />
        </MDetailsContextProvider>
      </Fragment>
    );
  }
};

MDetailsContainer.propTypes = {
  match: PT.shape({
    params: PT.shape({
      movie_id: PT.string.isRequired
    })
  }),

  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getMovieDetails: PT.func.isRequired,
    getCredits: PT.func.isRequired,
    getVideos: PT.func.isRequired,
    getImages: PT.func.isRequired,
    getRecommendations: PT.func.isRequired,
  }).isRequired,

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
    }).isRequired,

    images: PT.shape({
      isLoading: PT.bool.isRequired,
      error: PTS.nullOrString,
      data: PT.array.isRequired
    }).isRequired
  }).isRequired
};

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withRouter(MDetailsContainer));