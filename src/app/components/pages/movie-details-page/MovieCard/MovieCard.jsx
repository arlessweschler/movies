import 'app_components/pages/movie-details-page/MovieCard/MovieCard.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';

import { TMDB_IMAGE_URL } from 'app_config';
import { MoviePlayer, CrewNames, MovieTopInfo } from 'app_components/pages';

function MovieCard({ movie, videos }) {
  const { poster_path, overview } = movie;

  // console.log('-- MovieCard.render(), movie:', movie);

  const embedCls = 'embed-responsive';
  const baseCls = 'movie-details-card';
  const getColClasses = (size) => `col-sm-12 col-md-${size} col-lg-${size} col-xl-${size}`;

  return (
    <Fragment>
      <div className={`container ${baseCls}`}>

        {/* row start: top info */}
        <MovieTopInfo movie={movie} />
        {/* row end */}

        {/* row start: overview */}
        {overview
          ? <div className="row mb-3">
            {overview}
          </div>
          : ''}
        {/* row end */}

        {/* row start: poster and player */}
        <div className="row">

          {/* col start: poster */}
          <div className={`${embedCls} ${baseCls}__column ${baseCls}__column--left ${getColClasses(4)}`}>
            {poster_path
              ? <img
                className={`${embedCls}-item ${baseCls}__poster`}
                src={`${TMDB_IMAGE_URL.large}/${poster_path}`}
              />
              : <p>Нет постера</p>}
          </div>
          {/* col end */}

          {/* col start: player*/}
          <div className={`${baseCls}__column ${getColClasses(8)}`}>
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

        {/* row start: director */}
        <div className="row mt-2">
          <CrewNames
            label="Director"
            searchParams={{ department: 'Directing', job: 'Director' }}
          />
        </div>
        {/* row end */}

        {/* row start: screenplay */}
        <div className="row">
          <CrewNames
            label="Screenplay"
            searchParams={{ department: 'Writing', job: 'Screenplay' }}
          />
        </div>
        {/* row end */}

      </div>
    </Fragment>
  );
};

MovieCard.propTypes = {
  movie: PT.shape({
    poster_path: PT.string,
    overview: PT.string,
  }).isRequired,
};

export default MovieCard;