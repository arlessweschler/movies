import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PTS from 'app_services/PropTypesService';
import { hasRequestDiffs, getQueryParams } from 'app_services/UtilsService';
import { RecommendationsSection } from 'app_components/pages/movie-page/_sections';
import { ProgressBar } from 'app_components/layout';

import {
  getRecommendations
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ movieDetails }) => {
  return {
    recommendations: movieDetails.recommendations
  };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      getRecommendations
    }, dispatch)
  };
};

class RecommendationsContainer extends Component {

  componentDidUpdate(prevProps) {
    // console.warn('\n--RecommendationsContainer.componentDidUpdate()');

    const { recommendations, actions, location, match } = this.props;
    const { request } = recommendations;
    const { movie_id } = match.params;

    if (
      match.params !== prevProps.match.params
      || location.search !== prevProps.location.search
    ) {

      if (
        (movie_id != request.movie_id)
        || hasRequestDiffs({ request, checklist: ['lng'] })
      ) {
        const { lng } = getQueryParams();
        actions.getRecommendations({ movie_id, lng });
      }
    }
  }

  componentDidMount() {
    // console.warn('\n-- RecommendationsContainer.componentDidMount()');

    const { recommendations, match, actions } = this.props;
    const { request } = recommendations;
    const { movie_id } = match.params;

    if (movie_id != request.movie_id) {
      const { lng } = getQueryParams();
      actions.getRecommendations({ movie_id, lng });
    }
  }

  render() {
    const { recommendations } = this.props;
    const { data, error } = recommendations;

    return (
      <>
        {recommendations.isLoading && <ProgressBar />}

        <RecommendationsSection
          data_moviesList={{
            movies: data.results,
            error: error
          }}
        />
      </>
    );
  }
}

RecommendationsContainer.propTypes = {
  match: PT.shape({
    params: PT.shape({
      movie_id: PT.string.isRequired
    })
  }),

  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getRecommendations: PT.func.isRequired
  }).isRequired,

  recommendations: PT.shape({
    isLoading: PT.bool.isRequired,
    error: PTS.nullOrString,
    request: PT.shape({
      movie_id: PT.string,
      lng: PT.string,
    }).isRequired,
    data: PT.shape({
      page: PT.number.isRequired,
      total_pages: PTS.nullOrNumber,
      total_results: PTS.nullOrNumber,
      results: PT.array.isRequired,
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecommendationsContainer));