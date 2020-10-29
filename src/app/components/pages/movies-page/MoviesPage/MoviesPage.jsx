import './MoviesPage.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';

import PTS from 'app_services/PropTypesService';
import { isNotEmpty } from 'app_services/UtilsService';
import { Row } from 'app_components/layout';
import { MListContextProvider } from 'app_contexts';
import { BackdropMain, ToolbarBlock, PagingBlock, ListBlock } from
  'app_components/pages/movies-page/_blocks';
import { ProgressBar } from 'app_components/layout';

function MoviesPage({ data_toolbar, data_paging, data_genresContext, data_moviesList }) {

  // base component class
  const cls_base = 'movies-list';
  const b = b_.with(cls_base);

  const { error, movies } = data_moviesList;
  const hasMovies = isNotEmpty(movies);

  return (
    <div className={b()}>
      <BackdropMain />

      <Row>
        <div className="col-12 col-lg-auto p-0 pr-lg-2 toolbar-wrapper">
          <ToolbarBlock {...data_toolbar} />
        </div>

        {hasMovies
          ? (
            <div className="col-12 col-lg p-0 pagination-wrapper">
              <PagingBlock
                cls="m-0 justify-content-center justify-content-lg-end"
                {...data_paging}
              />
            </div>

          )
          : ''}
      </Row>

      <MListContextProvider {...data_genresContext}>
        {error && <p>{error}</p>}
        {hasMovies
          ? <ListBlock
            cls_base={cls_base}
            movies={movies}
          />
          : ''}
      </MListContextProvider>

      <Row cls="pagination-wrapper justify-content-center mt-3">
        <PagingBlock cls="m-0" {...data_paging} />
      </Row>
    </div >
  );
};

MoviesPage.propTypes = {
  data_toolbar: PT.shape({
    handleFilter: PT.func.isRequired,
    activeFilter: PT.string
  }).isRequired,

  data_paging: PT.shape({
    initialPage: PT.number.isRequired,
    pageCount: PTS.nullOrNumber,
    onPageChange: PT.func.isRequired
  }).isRequired,

  data_genresContext: PT.shape({
    genres: PT.array.isRequired,
    linkMovie: PT.func.isRequired
  }).isRequired,

  data_moviesList: PT.shape({
    error: PTS.nullOrString,
    movies: PT.array.isRequired
  }).isRequired,
};

export default MoviesPage;