import './ListBlock.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import PTS from 'app_services/PropTypesService';
import { isNotEmpty } from 'app_services/UtilsService';
import { ItemBlock } from 'app_components/pages/movies-page/_blocks';
import { ProgressBar } from 'app_components/layout';

function ListBlock(props) {

  // base component class
  const cls_base = 'movies-list';
  const b = b_.with(cls_base);

  const { isLoading, error, movies } = props;
  return (
    <Fragment>
      {error && <p>{error}</p>}

      {isLoading && <ProgressBar />}

      {
        isNotEmpty(movies)
          ? <div className={cn(b(), 'd-flex flex-wrap justify-content-between')}>
            {movies.map((movie) =>
              <ItemBlock
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