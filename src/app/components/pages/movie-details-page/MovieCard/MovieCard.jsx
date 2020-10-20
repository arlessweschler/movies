import 'app_components/pages/movie-details-page/MovieCard/MovieCard.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';

import { TMDB_IMAGE_URL } from 'app_config';
import { MoviePlayer } from 'app_components/pages';
import MovieInfo from './MovieInfo';

function MovieCard({ movie, videos }) {
  const { poster_path } = movie;

  // console.log('-- MovieCard.render(), movie:', movie);

  const embedCls = 'embed-responsive';
  const baseCls = 'movie-details-card';
  const getColClasses = (size) => `col-sm-12 col-md-${size} col-lg-${size} col-xl-${size}`;

  return (
    <Fragment>
      <div className={`container ${baseCls}`}>

        {/* row start */}
        <div className="row">

          {/* col start */}
          <div className={`${embedCls} ${baseCls}__column--left ${getColClasses(3)}`}>
            {poster_path
              ? <img
                className={`${embedCls}-item ${baseCls}__poster`}
                src={`${TMDB_IMAGE_URL.large}/${poster_path}`}
              />
              : <p>Нет постера</p>}
          </div>
          {/* col end */}

          {/* col start */}
          <div className={`${getColClasses(9)}`}>
            <div className={`${embedCls} ${embedCls}-16by9`}>
              <MoviePlayer
                videos={videos}
                searchParams={{ site: 'YouTube', type: 'Trailer' }}
              />
            </div>
          </div>
          {/* col end */}

        </div>
        {/* row end */}

        {/* row start */}
        <div className="row mt-2">
          <div className="col p-0">
            <MovieInfo
              movie={movie}
            />
          </div>
        </div>
        {/* row end */}

      </div>
    </Fragment>
  );
};

MovieCard.propTypes = {
  movie: PT.shape({
    poster_path: PT.string,
  }).isRequired,
};

export default MovieCard;