import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';

import PTS from 'app_services/PropTypesService';
import { DEFAULT_LANGUAGE } from 'app_i18n';
import { getDiffMethod } from 'app_services/UtilsService';
import { MoviePage } from 'app_components/pages';
import { MDetailsContextProvider } from 'app_contexts';
import {
  getMovieDetails,
  getCredits,
  getVideos,
  getImages,
  getRecommendations,
  getGenres
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
      getRecommendations,
      getGenres
    }, dispatch)
  };
};

class MDetailsContainer extends Component {

  static fetchData(store, urlParams, urlQuery) {
    console.log('-- MDetailsContainer.fetchData(), urlQuery:', urlQuery);
    const movie_id = urlParams[0].split('/').pop();
    const methods = [getMovieDetails, getCredits, getVideos, getImages, getRecommendations, getGenres];

    methods.forEach((method) => {
      store.dispatch(method({ movieId: movie_id, ...urlQuery }));
    });
  }

  componentWillUnmount() {
    // console.log('\n -- MDetailsContainer.componentWillUnmount()');
  }

  componentDidUpdate() {
    // console.log('\n -- MDetailsContainer.componentDidUpdate()');

    const { history, movieDetails, match, actions } = this.props;
    const { lng } = qs.parse(history.location.search);
    const { movie_id } = match.params;
    const { movie, credits, videos, images } = movieDetails;

    const list = [
      { request: movie.request, methodName: 'getMovieDetails' },
      { request: credits.request, methodName: 'getCredits' },
      { request: videos.request, methodName: 'getVideos' },
      { request: images.request, methodName: 'getImages' }
    ];

    list.forEach(({ request, methodName }) => {
      if (getDiffMethod(request)('lng', { withDefault: true, defaultValue: DEFAULT_LANGUAGE.value })
      ) {
        actions[methodName]({ movieId: movie_id, lng });
      }
    });
  }

  componentDidMount() {
    // console.warn('\n -- MDetailsContainer.componentDidMount()');

    const { actions, match, movieDetails, history } = this.props;
    const { movie_id } = match.params;
    const { lng } = qs.parse(history.location.search);

    const list = [
      { name: 'movie', methodName: 'getMovieDetails' },
      { name: 'credits', methodName: 'getCredits' },
      { name: 'videos', methodName: 'getVideos' },
      { name: 'images', methodName: 'getImages' }
    ];

    let segment;
    list.forEach(({ name, methodName }) => {
      segment = movieDetails[name];

      if (
        (movie_id != segment.request.movieId) ||
        (movie_id == segment.request.movieId && typeof lng !== 'undefined' && lng != segment.request.lng)
      ) {
        actions[methodName]({ movieId:movie_id, lng });
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

  history: PT.shape({
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired
  }).isRequired,

  actions: PT.shape({
    getMovieDetails: PT.func.isRequired,
    getCredits: PT.func.isRequired,
    getVideos: PT.func.isRequired,
    getImages: PT.func.isRequired,
    getRecommendations: PT.func.isRequired,
    getGenres: PT.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(MDetailsContainer);