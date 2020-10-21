import 'app_components/pages/movie-details-page/MoviePage/MoviePage.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from 'app_config';
import { col_classes } from 'app_services/FormatterService';
import { MoviePlayer, CrewNames, MovieTopInfo } from 'app_components/pages/movie-details-page/blocks';

function MoviePage({ movie }) {
  const { poster_path, overview } = movie;

  // console.log('-- MoviePage.render(), movie:', movie);

  const b = b_.B({ modSeparator: '--' }).with('movie-details');
  const cls_embed = 'embed-responsive';
  const keepAspectRatio = true;

  return (
    <Fragment>
      <div className={cn(b(), 'container')}>

        {/* row start: top info */}
        <MovieTopInfo />
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
          <div className={cn(
            col_classes(4),
            b('column', { left: true }),
            { [cls_embed]: keepAspectRatio }
          )}>
            {poster_path
              ? <img
                className={cn(
                  b('poster'),
                  { [`${cls_embed}-item`]: keepAspectRatio }
                )}
                src={`${TMDB_IMAGE_URL.large}/${poster_path}`}
              />
              : <p>Нет постера</p>}
          </div>
          {/* col end */}

          {/* col start: player*/}
          <div className={cn(
            b('column'),
            col_classes(8),
            { [cls_embed]: keepAspectRatio, [`${cls_embed}-16by9`]: keepAspectRatio }
          )}>
            <MoviePlayer
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

MoviePage.propTypes = {
  movie: PT.shape({
    poster_path: PT.string,
    overview: PT.string,
  }).isRequired,
};

export default MoviePage;