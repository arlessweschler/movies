import 'app_components/pages/movies-page/MoviesList/MoviesList.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import PTS from 'app_services/PropTypesService';
import { isNotEmpty } from 'app_services/UtilsService';
import { MovieItem } from 'app_components/pages';
import { ProgressBar } from 'app_components/layout';

function MoviesListPage(props) {
  const { isLoading, error, movies } = props;
  return (
    <Fragment>
      {error && <p>{error}</p>}

      {/* <div className="cstm-list"> */}
        {isLoading && <ProgressBar />}

        {
          isNotEmpty(movies)
            ? <div className="movies-list d-flex flex-wrap justify-content-between">
              {movies.map((movie) =>
                <MovieItem
                  key={uuidv4()}
                  movie={movie}
                />
              )}
            </div>
            : ''
        }
      {/* </div> */}
    </Fragment >
  );
};

MoviesListPage.propTypes = {
  isLoading: PT.bool.isRequired,
  error: PTS.nullOrString,
  movies: PT.array
};

export default MoviesListPage;