import './ListBlock.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { CardBlock } from 'app_components/pages/movies-page/_blocks';

function ListBlock(props) {
  // console.warn('--ListBlock, props:', props);

  const { cls_base, movies, printGenres } = props;
  if (!movies || movies.length < 1) return null;

  return (
    <div className={cn(`${cls_base}-grid`)}>
      {movies.map((movie) =>
        <CardBlock
          key={movie.id}
          cls={`${cls_base}-card`}
          printGenres={printGenres}
          movie={movie}
        />)}
    </div>
  );
};

ListBlock.propTypes = {
  movies: PT.array,
  printGenres: PT.func
};

ListBlock.defaultProps = {
  printGenres: () => { }
}

export default ListBlock;