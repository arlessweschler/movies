import './ListBlock.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { CardBlock } from 'app_components/pages/movies-page/_blocks';

function ListBlock({ cls_base, movies }) {
  return (
    <div className={cn(`${cls_base}-grid`, 'mt-3')}>
      {movies.map((movie) =>
        <CardBlock
          key={uuidv4()}
          cls={`${cls_base}-card`}
          movie={movie}
        />)}
    </div>
  );
};

ListBlock.propTypes = {
  movies: PT.array
};

export default ListBlock;