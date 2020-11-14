import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import b_ from 'b_';
import cn from 'classnames';

import PTS from 'app_services/PropTypesService';
import {
  isEmpty, isNotEmpty, hasRequestDiffs, getQueryParams
} from 'app_services/UtilsService';
import { MDetailsContextProvider } from 'app_contexts';
import { Backdrop, ProgressBar } from 'app_components/layout';
import {
  DescriptionSection, MediaSection, ActorsSection, GallerySection
} from 'app_components/pages/movie-page/_sections';
import { RecommsContainer } from 'app_containers';
import {
  getDetails, getCredits, getVideos, getImages
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ movieDetails }) => ({
  details: movieDetails
});

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDetails,
    getCredits,
    getVideos,
    getImages
  }, dispatch)
});

class MovieDetailsContainer extends Component {
  componentDidMount() {
    this.getDataIf(({ data }) => isEmpty(data));
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props;
    const { movieId } = match.params;

    if (
      (match.params !== prevProps.match.params)
      || (location.search !== prevProps.location.search)
    ) {
      this.getDataIf(({ request }) => (
        (movieId !== request.movieId)
        || hasRequestDiffs({ request, checklist: ['lng'] })
      ));
    }
  }

  getDataIf = (condition) => {
    const { details, match, actions } = this.props;
    const { movieId } = match.params;
    const { lng } = getQueryParams();

    const sections = [
      { sectionName: 'movie', methodName: 'getDetails' },
      { sectionName: 'credits', methodName: 'getCredits' },
      { sectionName: 'videos', methodName: 'getVideos' },
      { sectionName: 'images', methodName: 'getImages' }
    ];

    sections.forEach(({ sectionName, methodName }) => {
      if (condition(details[sectionName])) {
        actions[methodName]({ movieId, lng });
      }
    });
  }

  render() {
    const { details } = this.props;
    const {
      movie, credits, videos, images
    } = details;

    const cls_base = 'movie-details';
    const b = b_.with(cls_base);

    return (
      <>
        { Object.keys(details).some((key) => details[key].isLoading) && <ProgressBar />}

        {isNotEmpty(movie.data) &&
          <MDetailsContextProvider
            cls_base={cls_base}
            credits={credits.data}
            videos={videos.data}
            movie={movie.data}
            images={images.data}
          >
            <Backdrop backdrop_path={movie.data.backdrop_path} />

            <div className={cn(b())}>
              <DescriptionSection />
              <MediaSection />
              <ActorsSection />
              <GallerySection />
              <RecommsContainer />
            </div>
          </MDetailsContextProvider>}
      </>
    );
  }
}

MovieDetailsContainer.propTypes = {
  match: PT.shape({
    params: PT.shape({
      movieId: PT.string.isRequired
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
    movie: PTS.asyncShape('object'),
    credits: PTS.asyncShape('object'),
    videos: PTS.asyncShape('array'),
    images: PTS.asyncShape('array')
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieDetailsContainer));