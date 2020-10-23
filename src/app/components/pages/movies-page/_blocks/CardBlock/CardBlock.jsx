import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from 'app_config';
import { withMListContext } from 'app_hocs';
import { imageNotAvailable } from 'app_services/UtilsService';

function CardBlock(props) {
  const { movie, context } = props;
  const { id, poster_path, title, genre_ids, vote_average } = movie;
  const { printGenres, linkMovie } = context;

  return (
    <div
      className="card movie-link"
      onClick={() => linkMovie(id)}
    >
      <img
        className={cn({ 'no-image': !poster_path })}
        src={poster_path
          ? `${TMDB_IMAGE_URL.small}/${poster_path}`
          : imageNotAvailable}
      />

      <div className="card-body">
        {(vote_average > 0) && (
          <span className="card-rating">
            {vote_average}
          </span>)}

        <div className="card-title mb-1 mr-5">
          {title}
        </div>

        {genre_ids && printGenres({
          ids: genre_ids,
          cls: 'card-genres small'
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