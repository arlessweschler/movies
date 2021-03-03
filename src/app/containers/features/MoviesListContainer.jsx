import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PT from 'prop-types';

import { nullOrNumber, nullOrString } from '@/types';
import { isEmpty } from '@/utils/common';
import { getQueryParams, hasRequestDiffs } from '@/utils/url';
import { ToolbarBlock, PagingBlock, ListBlock, SearchResultsBlock } from '@/pages/movies-page';
import { Page, ProgressBar } from '@/layout';
import { Message, Row } from '@/markup';
import GenresContainer from '@/containers/features/GenresContainer';
import { getMovies } from '@/actions';

const mapStateToProps = ({ moviesList }) => ({ moviesList });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getMovies }, dispatch)
});

class MoviesListContainer extends Component {
  componentDidUpdate(prevProps) {
    const { moviesList, actions, location } = this.props;
    const { request } = moviesList;
    const checklist = ['lng', 'moviesType', 'page', 'search'];

    if ((location.search !== prevProps.location.search)) {
      if (hasRequestDiffs({ request, checklist })) {
        actions.getMovies(getQueryParams());
      }
    }
  }

  componentDidMount() {
    const { moviesList, actions } = this.props;
    const { data, isLoading, request } = moviesList;
    const checklist = ['lng', 'moviesType', 'page', 'search'];

    if (
      (isEmpty(data.results) && !isLoading)
      || hasRequestDiffs({ request, checklist })
    ) {
      actions.getMovies(getQueryParams());
    }
  }

  render() {
    const { moviesList } = this.props;
    const { data, error, isLoading, request } = moviesList;
    const { results, total_results, total_pages, page
    } = data;
    const { search } = request;
    const hasMovies = !isEmpty(results);
    const showPaging = hasMovies && total_results > 20;

    const pagingParams = {
      initialPage: (page - 1),
      pageCount: total_pages
    };

    return (
      <Page>
        {error && (
          <Message
            cls="mb-3"
            text={error}
            showAccessNote={true}
          />
        )}

        {isLoading && <ProgressBar />}

        <SearchResultsBlock
          search={search}
          total={total_results}
        />

        <Row>
          {!search && <ToolbarBlock />}

          {showPaging && (
            <PagingBlock
              wrapperCls="col-12 col-lg p-0"
              containerCls="pagination-top justify-content-lg-end"
              {...pagingParams}
            />
          )}
        </Row>

        <GenresContainer>
          <ListBlock movies={results} />
        </GenresContainer>

        {showPaging && (
          <PagingBlock
            wrapperCls="row mt-3"
            containerCls="pagination-bottom"
            {...pagingParams}
          />
        )}
      </Page>
    );
  }
}

MoviesListContainer.propTypes = {
  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getMovies: PT.func.isRequired
  }).isRequired,

  moviesList: PT.shape({
    isLoading: PT.bool.isRequired,
    error: nullOrString,
    request: PT.shape({
      moviesType: PT.string,
      page: PT.oneOfType([
        PT.number,
        PT.string
      ]),
      lng: PT.string,
      search: PT.string
    }).isRequired,
    data: PT.shape({
      page: PT.number.isRequired,
      total_pages: nullOrNumber,
      total_results: nullOrNumber,
      results: PT.array.isRequired,
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MoviesListContainer));