import React, { Fragment } from 'react';
import PT from 'prop-types';

import PTS from 'app_services/PropTypesService';
import { Row } from 'app_components/layout';
import { MoviesListContextProvider } from 'app_contexts/MoviesListContext';
import { MoviesToolbar, MoviesPaging, MoviesList } from
  'app_components/pages';

function MoviesPage({ data_toolbar, data_paging, data_genresContext, data_moviesList }) {

  return (
    <Fragment>
      <Row cls="mb-2">
        <MoviesToolbar {...data_toolbar} />
      </Row>

      <Row cls="mb-2">
        <MoviesPaging {...data_paging} />
      </Row>

      <MoviesListContextProvider {...data_genresContext}>
        <Row>
          <MoviesList {...data_moviesList} />
        </Row>
      </MoviesListContextProvider>
    </Fragment>
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
    isLoading: PT.bool.isRequired,
    error: PTS.nullOrString,
    movies: PT.array.isRequired
  }).isRequired,
};

export default MoviesPage;