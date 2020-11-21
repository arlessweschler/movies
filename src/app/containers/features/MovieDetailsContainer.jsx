import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { asyncShape } from '@/types';
import { isEmpty } from '@/utils/common';
import { hasRequestDiffs, getQueryParams } from '@/utils/url';
import { CreditsContextProvider, VideosContextProvider } from '@/contexts';
import { ProgressBar, Backdrop, Page } from '@/layout';
import { DescriptionSection, MediaSection, ActorsSection, GallerySection } from '@/pages/movie-page';
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
    const { movie } = details;
    const { data } = movie;
    const { backdrop_path, poster_path } = data;

    return (
      <Page>
        { Object.keys(details).some((key) => details[key].isLoading) && <ProgressBar />}

        {!isEmpty(data) && (
          <>
            <Backdrop
              backdrop_path={backdrop_path}
            />

            <CreditsContextProvider
              credits={details.credits}
            >
              <DescriptionSection movie={data} />
              <VideosContextProvider
                videos={details.videos}
              >
                <MediaSection
                  poster_path={poster_path}
                />
              </VideosContextProvider>
              <ActorsSection />
              <GallerySection
                images={details.images}
              />
              <RecommsContainer />
            </CreditsContextProvider>
          </>
        )}
      </Page>
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
    movie: asyncShape('object'),
    credits: asyncShape('object'),
    videos: asyncShape('array'),
    images: asyncShape('array')
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieDetailsContainer));