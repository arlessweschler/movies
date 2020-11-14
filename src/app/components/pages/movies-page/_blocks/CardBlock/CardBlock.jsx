import './CardBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import withMoviesNav from 'app_hocs/withMoviesNav';
import { CardImageBlock } from
  'app_components/pages/movies-page/_blocks';

function CardBlock(props) {
  const { movie, printGenres, linkMovie } = props;
  const { id, title, genre_ids } = movie;
  const b = b_.with('list-card');

  return (
    <div
      className={cn(b(), 'mx-auto')}
      onClick={() => linkMovie(id)}
    >
      <CardImageBlock
        {...{ movie }}
      />

      <div className={b('body')}>
        <div className={cn(b('title'), 'mb-1')}>
          {title}
        </div>

        {genre_ids && printGenres({
          ids: genre_ids,
          cls: cn(b('genres'), 'small')
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