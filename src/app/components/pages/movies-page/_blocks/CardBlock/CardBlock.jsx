import './CardBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from 'app_config';
import { withMListContext } from 'app_hocs';
import { imageNotAvailable } from 'app_services/UtilsService';

function CardBlock(props) {
  const { cls, movie, context } = props;
  const { id, poster_path, title, genre_ids, vote_average } = movie;
  const { printGenres, linkMovie } = context;

  const b = b_.with(cls);

  return (
    <div
      className={b()}
      onClick={() => linkMovie(id)}
    >
      <img
        className={cn(b('image'), { 'no-image': !poster_path })}
        src={poster_path
          ? `${TMDB_IMAGE_URL.medium}/${poster_path}`
          : imageNotAvailable}
      />

      <div className={b('body')}>
        {(vote_average > 0) && (
          <span className={b('rating')}>
            {vote_average}
          </span>)}

        <div className={cn(b('title'), 'mb-1 mr-4')}>
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
  movie: PT.shape({
    poster_path: PT.string,
    title: PT.string.isRequired,
    genre_ids: PT.array,
    vote_average: PT.number,
  }).isRequired,

  context: PT.shape({
    printGenres: PT.func.isRequired,
    linkMovie: PT.func.isRequired
  }).isRequired
};

export default withMListContext(CardBlock);