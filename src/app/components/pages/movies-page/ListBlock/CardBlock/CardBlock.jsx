import styles from './CardBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import withMoviesNav from '@/hocs/withMoviesNav';
import CardImageBlock from './CardImageBlock';

function CardBlock(props) {
  const { movie, printGenres, linkMovie } = props;
  const { id, title, genre_ids } = movie;

  const onClick = (e) => {
    const cardEl = e.target.closest('div[data-movie-id]');

    if (cardEl) {
      linkMovie(cardEl.dataset.movieId);
    }
  };

  return (
    <div
      className={cn(styles.card, 'mx-auto')}
      data-test="movie-card"
      data-movie-id={id}
      onClick={onClick}
    >
      <CardImageBlock
        movie={movie}
      />

      <div className={styles.body}>
        <div
          className={cn(styles.title, 'mb-1')}
          data-test="movie-card__title"
        >
          {title}
        </div>

        {genre_ids && printGenres({
          ids: genre_ids,
          cls: cn(styles.genres, 'small'),
          dataTest: 'movie-card__genres'
        })}
      </div>
    </div>
  );
}

CardBlock.propTypes = {
  linkMovie: PT.func.isRequired,

  printGenres: PT.func.isRequired,
  movie: PT.shape({
    id: PT.number,
    poster_path: PT.string,
    title: PT.string.isRequired,
    genre_ids: PT.array,
    vote_average: PT.number,
  }).isRequired,
};

export default withMoviesNav(CardBlock);