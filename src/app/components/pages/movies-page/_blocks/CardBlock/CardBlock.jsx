import './CardBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { withMListContext } from 'app_contexts';
import { CardImageBlock } from
  'app_components/pages/movies-page/_blocks';

function CardBlock(props) {
  const { cls, movie, printGenres, context } = props;
  const { id, title, genre_ids } = movie;
  const { linkMovie } = context;

  const b = b_.with(cls);

  return (
    <div
      className={cn(b(), 'mx-auto')}
      onClick={() => linkMovie(id)}
    >
      <CardImageBlock
        cls={cls}
        movie={movie}
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
};

CardBlock.propTypes = {
  printGenres: PT.func.isRequired,
  movie: PT.shape({
    poster_path: PT.string,
    title: PT.string.isRequired,
    genre_ids: PT.array,
    vote_average: PT.number,
  }).isRequired,

  context: PT.shape({
    linkMovie: PT.func.isRequired
  }).isRequired
};

export default withMListContext(CardBlock);