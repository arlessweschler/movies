import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PT from 'prop-types';
import cn from 'classnames';

import PTS from 'app_services/PropTypesService';
import { isEmpty, getQueryParams, hasRequestDiffs } from 'app_services/UtilsService';
import { Message, ProgressBar, Row } from 'app_components/layout';
import { ToolbarBlock, PagingBlock, ListBlock, SearchResultsBlock } from 'app_components/pages/movies-page/_blocks';
import { getMovies } from 'redux_actions';

// маппинг редюсеров
const mapStateToProps = ({ moviesList }) => {
  return { moviesList };
};

// маппинг экшен креэйторов
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ getMovies }, dispatch)
  };
};

class MListContainer extends Component {

  componentDidUpdate(prevProps) {
    // console.warn('\n--MListContainer.componentDidUpdate()');

    const { moviesList, actions, location } = this.props;
    const { request } = moviesList;
    const checklist = ['lng', 'moviesType', 'page', 'search'];

    if ((location.search !== prevProps.location.search)) {
      if (hasRequestDiffs({ request, checklist })) {
        actions.getMovies(getQueryParams());
      };
    }
  }

  componentDidMount() {
    // console.warn('\n--MListContainer.componentDidMount()');

    const { moviesList, actions } = this.props;
    const { data, isLoading, request } = moviesList;
    const checklist = ['lng', 'moviesType', 'page', 'search'];

    if (
      (isEmpty(data.results) && !isLoading)
      || hasRequestDiffs({ request, checklist })
    ) {
      actions.getMovies(getQueryParams());
    };
  }

  render() {
    const { moviesList } = this.props;
    const { data, error, isLoading } = moviesList;
    const { results, total_results, total_pages, page } = data;
    const { search } = getQueryParams();

    const cls_base = 'movies-list';
    const hasMovies = !isEmpty(results);

    const props_paging = {
      initialPage: (page - 1),
      pageCount: total_pages
    };

    return (
      <div className={cn(cls_base)}>
        {error && <Message cls="mb-3" text={error} />}
        {isLoading && <ProgressBar />}

        <SearchResultsBlock
          cls_base={`${cls_base}-search-results`}
          search={search}
          total={total_results}
        />

        <Row>
          {!search && (
            <div className="col-12 col-lg-auto p-0 pr-lg-2 toolbar-wrapper">
              <ToolbarBlock />
            </div>
          )}

          {(hasMovies && total_results > 20) && (
            <div className="col-12 col-lg p-0 pagination-wrapper">
              <PagingBlock cls="justify-content-lg-end m-0"
                {...props_paging}
              />
            </div>
          )}
        </Row>

        <ListBlock cls_base={cls_base} movies={results} />

        {(hasMovies && total_results > 20) && (
          <Row cls="pagination-wrapper mt-3">
            <PagingBlock cls="m-0" {...props_paging} />
          </Row>
        )}
      </div >
    );
  }
};

MListContainer.propTypes = {
  location: PT.shape({
    search: PT.string.isRequired
  }).isRequired,

  actions: PT.shape({
    getMovies: PT.func.isRequired
  }).isRequired,

  moviesList: PT.shape({
    isLoading: PT.bool.isRequired,
    error: PTS.nullOrString,
    data: PT.shape({
      page: PT.number.isRequired,
      total_pages: PTS.nullOrNumber,
      total_results: PTS.nullOrNumber,
      results: PT.array.isRequired,
    }).isRequired
  }).isRequired
};

export default
  connect(mapStateToProps, mapDispatchToProps)
    (withRouter(MListContainer));