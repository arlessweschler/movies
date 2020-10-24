import './CardBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

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
      className={cn(b(), 'mx-auto')}
      onClick={() => linkMovie(id)}
    >
      <div className={b('image-wrapper')}>
        <img
          className={cn(b('image'), { 'no-image': !poster_path })}
          src={poster_path
            ? `${TMDB_IMAGE_URL.medium}/${poster_path}`
            : imageNotAvailable}
        />
        {(vote_average > 0) && (
          <span className={b('rating')}>
            <FontAwesomeIcon
              className={cn(b('icon'), 'mr-1')}
              icon={faStar}
            />
            {vote_average}
          </span>)}
      </div>

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