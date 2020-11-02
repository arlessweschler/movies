import './ListBlock.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import withGenres from 'app_hocs/withGenres';
import { CardBlock } from 'app_components/pages/movies-page/_blocks';

function ListBlock({ cls_base, movies, printGenres }) {
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
  printGenres: PT.func.isRequired,
  movies: PT.array
};

export default withGenres(ListBlock);