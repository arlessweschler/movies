import './ListBlock.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import PTS from 'app_services/PropTypesService';
import { isNotEmpty } from 'app_services/UtilsService';
import { CardBlock } from 'app_components/pages/movies-page/_blocks';
import { ProgressBar } from 'app_components/layout';

function ListBlock(props) {
  const { isLoading, error, movies } = props;

  return (
    <Fragment>
      {error && <p>{error}</p>}

      {isLoading && <ProgressBar />}

      {
        isNotEmpty(movies)
          ? <div className="d-flex flex-wrap justify-content-between mt-3">
            {movies.map((movie) =>
              <CardBlock
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

ListBlock.propTypes = {
  isLoading: PT.bool.isRequired,
  error: PTS.nullOrString,
  movies: PT.array
};

export default ListBlock;