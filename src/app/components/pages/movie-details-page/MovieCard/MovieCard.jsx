import 'app_components/pages/movie-details-page/MovieCard/MovieCard.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from 'app_config';
import { col_classes } from 'app_services/FormatterService';
import { MoviePlayer, CrewNames, MovieTopInfo } from 'app_components/pages';

function MovieCard({ movie, videos }) {
  const { poster_path, overview } = movie;

  // console.log('-- MovieCard.render(), movie:', movie);

  const b = b_.B({ modSeparator: '--' }).with('movie-details');
  const cls_embed = 'embed-responsive';

  return (
    <Fragment>
      <div className={cn(b(), 'container')}>

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
          <div className={cn(b('column', { left: true }), col_classes(4), cls_embed)}>
            {poster_path
              ? <img
                className={cn(b('poster'), `${cls_embed}-item`)}
                src={`${TMDB_IMAGE_URL.large}/${poster_path}`}
              />
              : <p>Нет постера</p>}
          </div>
          {/* col end */}

          {/* col start: player*/}
          <div className={cn(b('column'), col_classes(8), cls_embed, `${cls_embed}-16by9`)}>
            <MoviePlayer
              videos={videos}
              searchParams={{ site: 'YouTube', type: 'Trailer' }}
            />
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