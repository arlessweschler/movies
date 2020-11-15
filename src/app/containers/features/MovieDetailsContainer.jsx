import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PTS from '@/services/PropTypesService';
import { isEmpty, isNotEmpty, hasRequestDiffs, getQueryParams } from '@/services/UtilsService';
import { MDetailsContextProvider } from '@/contexts';
import { ProgressBar, Backdrop, Page } from '@/layout';
import { DescriptionSection, MediaSection, ActorsSection, GallerySection } from '@/pages/movie-page/_sections';
import RecommsContainer from '@/containers/features/RecommsContainer';
import { getDetails, getCredits, getVideos, getImages } from '@/actions';

const mapStateToProps = ({ movieDetails }) => ({
  details: movieDetails
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getDetails, getCredits, getVideos, getImages
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

    return (
      <>
        { Object.keys(details).some((key) => details[key].isLoading) && <ProgressBar />}

        {isNotEmpty(movie.data) &&
          <MDetailsContextProvider
            credits={credits.data}
            videos={videos.data}
            movie={movie.data}
            images={images.data}
          >
            <Backdrop backdrop_path={movie.data.backdrop_path} />

            <Page>
              <DescriptionSection />
              <MediaSection />
              <ActorsSection />
              <GallerySection />
              <RecommsContainer />
            </Page>
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