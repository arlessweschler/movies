import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PTS from 'app_services/PropTypesService';
import { isEmpty, hasRequestDiffs, getQueryParams } from 'app_services/UtilsService';
import { MoviePage } from 'app_components/pages';
import { MDetailsContextProvider } from 'app_contexts';
import { ProgressBar } from 'app_components/layout';
import {
  getDetails,
  getCredits,
  getVideos,
  getImages
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ movieDetails }) => {
  return {
    details: movieDetails
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getDetails,
      getCredits,
      getVideos,
      getImages
    }, dispatch)
  };
};

class MovieDetailsContainer extends Component {

  componentDidMount() {
    this.getDataIf(({ data }) => isEmpty(data));
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props;
    const { movie_id } = match.params;

    if (
      (match.params !== prevProps.match.params) ||
      (location.search !== prevProps.location.search)
    ) {
      this.getDataIf(({ request }) => (
        (movie_id !== request.movie_id) ||
        hasRequestDiffs({ request, checklist: ['lng'] })
      ));
    }
  }

  getDataIf = (condition) => {
    const { details, match, actions } = this.props;
    const { movie_id } = match.params;
    const { lng } = getQueryParams();

    const sections = [
      { sectionName: 'movie', methodName: 'getDetails' },
      { sectionName: 'credits', methodName: 'getCredits' },
      { sectionName: 'videos', methodName: 'getVideos' },
      { sectionName: 'images', methodName: 'getImages' }
    ];

    sections.forEach(({ sectionName, methodName }) => {
      if (condition(details[sectionName])) {
        actions[methodName]({ movie_id, lng });
      }
    });
  }

  render() {
    const { details } = this.props;
    const { movie, credits, videos, images } = details;

    return (
      <Fragment>
        {
          Object.keys(details).some(key => details[key].isLoading)
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

MovieDetailsContainer.propTypes = {
  match: PT.shape({
    params: PT.shape({
      movie_id: PT.string.isRequired
    })
  }),

  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getDetails: PT.func.isRequired,
    getCredits: PT.func.isRequired,
    getVideos: PT.func.isRequired,
    getImages: PT.func.isRequired
  }).isRequired,

  details: PT.shape({
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
    (withRouter(MovieDetailsContainer));