import './MoviesPage.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';

import PTS from 'app_services/PropTypesService';
import { isNotEmpty } from 'app_services/UtilsService';
import { Row } from 'app_components/layout';
import { MListContextProvider } from 'app_contexts';
import { ToolbarBlock, PagingBlock, ListBlock } from
  'app_components/pages/movies-page/_blocks';

function MoviesPage({ t, data_toolbar, data_paging, data_genresContext, data_moviesList }) {

  // base component class
  const cls_base = 'movies-list';
  const b = b_.with(cls_base);

  const { error, movies, search, total_results, isLoading } = data_moviesList;
  const hasMovies = isNotEmpty(movies);

  return (
    <div className={b()}>

      {
        (total_results !== null && search) && (
          <Row cls={cn(b('search-results'), 'mb-lg-2')}>
            {t('movie_search.found.count', { count: total_results })} <span className="search-highlight mx-1">{total_results}</span> {t('movie_search.movie.count', { count: total_results })} {t('movie_search.by_title')} "<span className="search-highlight">{search}</span>"
          </Row>
        )
      }
      <Row>
        {!search && (
          <div className="col-12 col-lg-auto p-0 pr-lg-2 toolbar-wrapper">
            <ToolbarBlock {...data_toolbar} />
          </div>
        )}

        {(hasMovies && total_results > 20)
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

      {(hasMovies && total_results > 20)
        ? (
          <Row cls="pagination-wrapper justify-content-center mt-3">
            <PagingBlock cls="m-0" {...data_paging} />
          </Row>
        )
        : ''}
    </div >
  );
};

MoviesPage.propTypes = {
  t: PT.func.isRequired,

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

export default withTranslation()(MoviesPage);