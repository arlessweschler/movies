import React, { useContext } from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import { TMDB_IMAGE_URL } from 'app_config';
import GenresContext from 'app_contexts/GenresContext';

function MovieItem({ movie }) {
  const { id, poster_path, title, genre_ids, vote_average } = movie;
  const { printGenres } = useContext(GenresContext);

  return (
    <Link className="card movie-link" to={`/movies/${id}`}>
      {poster_path
        ? <img src={`${TMDB_IMAGE_URL.small}/${poster_path}`} />
        : <div className="no-image" />}

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
    </Link>
  );
};

MovieItem.propTypes = {
  movie: PT.shape({
    poster_path: PT.string,
    title: PT.string.isRequired,
    genre_ids: PT.array,
    vote_average: PT.number,
  }).isRequired
};

export default MovieItem;