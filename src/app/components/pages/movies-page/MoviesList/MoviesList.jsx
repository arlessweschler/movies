import React, { Fragment } from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { MovieItem } from 'app_components/pages';
import { isNotEmpty } from 'app_services/UtilsService';
import PTS from 'app_services/PropTypesService';

function MoviesListPage(props) {
  const { isLoading, error, movies } = props;
  return (
    <Fragment>
      { isLoading ? <p>Загрузка...</p> : ''}

      { error ? <p>{error}</p> : ''}

      {
        isNotEmpty(movies)
          ? <div className="d-flex flex-wrap justify-content-between movies-list">
            {movies.map((movie) =>
              <MovieItem
                key={uuidv4()}
                movie={movie}
              />
            )}
          </div>
          : ''
      }
    </Fragment >
  );
};

MoviesListPage.propTypes = {
  isLoading: PT.bool.isRequired,
  error: PTS.nullOrNumber,
  movies: PT.array
};

export default MoviesListPage;