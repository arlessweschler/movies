import styles from './ListBlock.module.scss';

import React from 'react';
import PT from 'prop-types';

import CardBlock from './CardBlock';

function ListBlock({ movies, printGenres }) {
  if (!movies || movies.length < 1) return null;

  return (
    <div
      className={styles.list}
      data-test="movies-list"
    >
      {movies.map((movie) => (
        <CardBlock
          key={movie.id}
          printGenres={printGenres}
          movie={movie}
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