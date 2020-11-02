import './MoviesPage.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import { withTranslation } from 'react-i18next';

import PTS from 'app_services/PropTypesService';
import { isNotEmpty } from 'app_services/UtilsService';
import { Row } from 'app_components/layout';
import { ToolbarBlock, PagingBlock, ListBlock, SearchResultsBlock } from
  'app_components/pages/movies-page/_blocks';

function MoviesPage({ t, data_paging, data_moviesList }) {

  // base component class
  const cls_base = 'movies-list';
  const b = b_.with(cls_base);

  const { movies, search, total_results } = data_moviesList;
  const hasMovies = isNotEmpty(movies);

  return (
    <div className={b()}>
      <SearchResultsBlock
        cls={`${cls_base}-search-results`}
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
            <PagingBlock
              cls="m-0 justify-content-center justify-content-lg-end"
              {...data_paging}
            />
          </div>
        )}
      </Row>
      
      {hasMovies && (
        <ListBlock
          cls_base={cls_base}
          movies={movies}
        />
      )}

      {(hasMovies && total_results > 20) && (
        <Row cls="pagination-wrapper justify-content-center mt-3">
          <PagingBlock cls="m-0" {...data_paging} />
        </Row>
      )}
    </div >
  );
};

MoviesPage.propTypes = {
  t: PT.func.isRequired,

  data_paging: PT.shape({
    initialPage: PT.number.isRequired,
    pageCount: PTS.nullOrNumber
  }).isRequired,

  data_moviesList: PT.shape({
    movies: PT.array.isRequired,
    search: PT.string,
    total_results: PTS.nullOrNumber
  }).isRequired,
};

export default withTranslation()(MoviesPage);