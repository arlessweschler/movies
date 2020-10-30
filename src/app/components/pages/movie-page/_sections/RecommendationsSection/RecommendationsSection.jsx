import './RecommendationsSection.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';

import PTS from 'app_services/PropTypesService';
import { isNotEmpty } from 'app_services/UtilsService';
import { MListContextProvider } from 'app_contexts';
import { ListBlock } from
  'app_components/pages/movies-page/_blocks';

function RecommendationsSection({ data_genresContext, data_moviesList }) {

  // base component class
  const cls_base = 'movies-list';
  const b = b_.with(cls_base);

  const { error, movies } = data_moviesList;
  const hasMovies = isNotEmpty(movies);

  return (
    <div className={b()}>
      <MListContextProvider {...data_genresContext}>
        {error && <p>{error}</p>}
        {hasMovies
          ? <ListBlock
            cls_base={cls_base}
            movies={movies}
          />
          : ''}
      </MListContextProvider>
    </div >
  );
};

RecommendationsSection.propTypes = {
  data_genresContext: PT.shape({
    genres: PT.array.isRequired,
    linkMovie: PT.func.isRequired
  }).isRequired,

  data_moviesList: PT.shape({
    error: PTS.nullOrString,
    movies: PT.array.isRequired
  }).isRequired,
};

export default RecommendationsSection;