import React, { Component } from 'react';
import PT from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { nullOrNumber, nullOrString } from '@/types';
import { hasRequestDiffs, getQueryParams } from '@/utils/url';
import { RecommsSection } from '@/pages/movie-page/_sections';
import { ProgressBar } from '@/layout';
import { getRecomms } from '@/actions';

const mapStateToProps = ({ movieDetails }) => ({
  recommsList: movieDetails.recommsList
});

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
    const { movieId } = match.params;

    if (
      match.params !== prevProps.match.params
      || location.search !== prevProps.location.search
    ) {
      if (
        (movieId !== request.movieId)
        || hasRequestDiffs({ request, checklist: ['lng'] })
      ) {
        const { lng } = getQueryParams();
        actions.getRecomms({ movieId, lng });
      }
    }
  }

  componentDidMount() {
    // console.warn('\n-- RecommsContainer.componentDidMount()');

    const { recommsList, match, actions } = this.props;
    const { request } = recommsList;
    const { movieId } = match.params;

    if (movieId !== request.movieId) {
      const { lng } = getQueryParams();
      actions.getRecomms({ movieId, lng });
    }
  }

  render() {
    const { recommsList } = this.props;
    const { data, isLoading } = recommsList;

    return (
      <>
        {isLoading && <ProgressBar />}

        <RecommsSection movies={data.results} />
      </>
    );
  }
}

RecommsContainer.propTypes = {
  match: PT.shape({
    params: PT.shape({
      movieId: PT.string.isRequired
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
    error: nullOrString,
    request: PT.shape({
      movieId: PT.string,
      lng: PT.string,
    }).isRequired,
    data: PT.shape({
      page: PT.number.isRequired,
      total_pages: nullOrNumber,
      total_results: nullOrNumber,
      results: PT.array.isRequired,
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecommsContainer));