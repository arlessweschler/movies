import React, { Component, Fragment } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import PTS from 'app_services/PropTypesService';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';
import { DEFAULT_LANGUAGE } from 'app_i18n';
import { redirect } from 'app_history';
import { isEmpty, getDiffMethod, difference } from 'app_services/UtilsService';
import { RecommendationsSection } from 'app_components/pages/movie-page/_sections';
import { ProgressBar } from 'app_components/layout';

import {
  getRecommendations,
  getGenres,
  resetMovieDetails
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ movieDetails, moviesList }) => {
  return {
    recommendations: movieDetails.recommendations,
    genres: moviesList.genres
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getRecommendations,
      getGenres,
      resetMovieDetails
    }, dispatch)
  };
};

class MRecommendationsContainer extends Component {
  constructor() {
    super();
    this.hasUrlQueryDiffs = this.hasUrlQueryDiffs.bind(this);
    this.linkMovie = this.linkMovie.bind(this);
  }

  componentDidUpdate(prevProps) {
    // console.warn('\n-- MRecommendationsContainer.componentDidUpdate()');

    // const diffs = difference(this.props, prevProps);
    // console.warn('difference:', diffs);

    const { recommendations, genres, actions, history, match } = this.props;
    const { lng } = qs.parse(history.location.search);
    const { movie_id } = match.params;

    if (
      (prevProps.match.params !== this.props.match.params)
      || (prevProps.location.search !== this.props.location.search)
    ) {
      if (this.hasUrlQueryDiffs(genres.request, 'getGenres check', ['lng'])) {
        actions.getGenres({ lng });
      };

      if (
        (movie_id != recommendations.request.movieId)
        || this.hasUrlQueryDiffs(recommendations.request, 'getRecommendations check', ['lng'])
      ) {

        actions.getRecommendations({ movieId: movie_id, lng });
      }
    };
  }

  componentDidMount() {
    // console.warn('\n-- MRecommendationsContainer.componentDidMount()');

    const { recommendations, genres, match, history, actions } = this.props;

    const { lng } = qs.parse(history.location.search);
    const { movie_id } = match.params;

    if (
      isEmpty(genres.data)
      // || this.hasUrlQueryDiffs(genres.request, 'getGenres check', ['lng'])
    ) {
      actions.getGenres({ lng });
    };

    if (
      // isEmpty(recommendations.data.results) ||
      (movie_id != recommendations.request.movieId)
      // || (typeof lng !== 'undefined' && lng != recommendations.request.lng)
    ) {
      actions.getRecommendations({ movieId: movie_id, lng });
    }
  }

  // проверяем различия параметров последнего запроса (ключи объекта request) в store с: 
  // 1. значениями этих параметров из url search query или 
  // (опционально) 2. дефолтными значениями этих из редюсера
  hasUrlQueryDiffs(request, message, list) {
    if (message) {
      message = `MRecommendationsContainer, ${message}`
    }
    const checkDiffs = getDiffMethod(request, message);

    let params = [
      { key: 'lng', defaultValue: DEFAULT_LANGUAGE.value },
      { key: 'page', defaultValue: 1 },
      { key: 'moviesType', defaultValue: DEFAULT_MOVIES_TYPE }
    ];

    if (list) {
      params = params.filter(i => list.includes(i.key));
    }

    return params.some(
      (item) => checkDiffs(item.key, {
        withDefault: true,
        defaultValue: item.defaultValue
      })
    );
  }

  linkMovie(id) {
    const { history, actions } = this.props;
    const { lng } = qs.parse(history.location.search);
    const nextParams = { lng };

    actions.resetMovieDetails();
    redirect(`/movies/${id}?${qs.stringify(nextParams)}`);
  }

  render() {
    const { recommendations, genres } = this.props;
    const { data, error } = recommendations;

    return (
      <Fragment>
        {
          (recommendations.isLoading || genres.isLoading) && <ProgressBar />
        }

        <RecommendationsSection
          data_genresContext={{
            genres: genres.data,
            linkMovie: this.linkMovie
          }}

          data_moviesList={{
            movies: data.results,
            error: error
          }}
        />
      </Fragment>
    );
  }
};

MRecommendationsContainer.propTypes = {
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
    getRecommendations: PT.func.isRequired,
    getGenres: PT.func.isRequired,
    resetMovieDetails: PT.func.isRequired,
  }).isRequired,

  recommendations: PT.shape({
    isLoading: PT.bool.isRequired,
    error: PTS.nullOrString,
    data: PT.shape({
      page: PT.number.isRequired,
      total_pages: PTS.nullOrNumber,
      total_results: PTS.nullOrNumber,
      results: PT.array.isRequired,
    }).isRequired
  }).isRequired,

  genres: PT.shape({
    data: PT.array.isRequired
  }).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MRecommendationsContainer));