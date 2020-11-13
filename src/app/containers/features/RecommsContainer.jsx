import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PTS from 'app_services/PropTypesService';
import { hasRequestDiffs, getQueryParams } from 'app_services/UtilsService';
import { RecommsSection } from 'app_components/pages/movie-page/_sections';
import { ProgressBar } from 'app_components/layout';

import {
  getRecomms
} from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ movieDetails }) => ({
  recommsList: movieDetails.recommsList
});

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getRecomms
  }, dispatch)
});

class RecommsContainer extends Component {
  componentDidUpdate(prevProps) {
    // console.warn('\n--RecommsContainer.componentDidUpdate()');

    const {
      recommsList, actions, location, match
    } = this.props;
    const { request } = recommsList;
    const { movie_id } = match.params;

    if (
      match.params !== prevProps.match.params
      || location.search !== prevProps.location.search
    ) {
      if (
        (movie_id !== request.movie_id)
        || hasRequestDiffs({ request, checklist: ['lng'] })
      ) {
        const { lng } = getQueryParams();
        actions.getRecomms({ movie_id, lng });
      }
    }
  }

  componentDidMount() {
    // console.warn('\n-- RecommsContainer.componentDidMount()');

    const { recommsList, match, actions } = this.props;
    const { request } = recommsList;
    const { movie_id } = match.params;

    if (movie_id !== request.movie_id) {
      const { lng } = getQueryParams();
      actions.getRecomms({ movie_id, lng });
    }
  }

  render() {
    const { recommsList } = this.props;
    const { data, error } = recommsList;

    return (
      <>
        {recommsList.isLoading && <ProgressBar />}

        <RecommsSection
          data_moviesList={{
            movies: data.results,
            error
          }}
        />
      </>
    );
  }
}

RecommsContainer.propTypes = {
  match: PT.shape({
    params: PT.shape({
      movie_id: PT.string.isRequired
    })
  }),

  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getRecomms: PT.func.isRequired
  }).isRequired,

  recommsList: PT.shape({
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecommsContainer));