import './ListBlock.scss';

import React from 'react';
import PT from 'prop-types';

import { CardBlock } from 'app_components/pages/movies-page/_blocks';

function ListBlock({ movies, printGenres }) {
  if (!movies || movies.length < 1) return null;

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <CardBlock
          key={movie.id}
          printGenres={printGenres}
          {...{ movie }}
        />
      ))}
    </div>
  );
}

ListBlock.propTypes = {
  movies: PT.array,
  printGenres: PT.func
};

ListBlock.defaultProps = {
  printGenres: () => { }
};

export default ListBlock;