import React from 'react';
import PT from 'prop-types';

import { TMDB_IMAGE_URL } from 'app_config';

function MovieCard({ movie }) {
  const { id, title, tagline, overview, genres, poster_path, release_dat, runtime, vote_average } = movie;

  console.log('-- MovieCard.render(), movie:', movie);

  return (
    <div className="container">
      <div className="row">

        {/* левая колонка */}
        <div className="col">
          {
            poster_path
              ? <img src={`${TMDB_IMAGE_URL.medium}/${poster_path}`} />
              : <p>Нет постера</p>
          }
        </div>

        {/* правая колонка */}
        <div className="col">
          <h1>{title}</h1>
          {tagline && <p><b>{tagline}</b></p>}
          {overview && <p>{overview}</p>}
        </div>

      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PT.shape({
    title: PT.string,
    overview: PT.string,
    poster_path: PT.string,
  }).isRequired,
};

export default MovieCard;