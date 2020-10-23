import React, { Fragment } from 'react';
import PT from 'prop-types';

import PTS from 'app_services/PropTypesService';
import { Row } from 'app_components/layout';
import { MListContextProvider } from 'app_contexts/MListContext';
import { ToolbarBlock, PagingBlock, ListBlock } from
'app_components/pages/movies-page/_blocks';

function MoviesPage({ data_toolbar, data_paging, data_genresContext, data_moviesList }) {

  return (
    <Fragment>
      <Row cls="mb-2">
        <ToolbarBlock {...data_toolbar} />
      </Row>

      <Row cls="mb-2">
        <PagingBlock {...data_paging} />
      </Row>

      <MListContextProvider {...data_genresContext}>
        <Row>
          <ListBlock {...data_moviesList} />
        </Row>
      </MListContextProvider>
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