import 'app_components/pages/movie-details-page/MoviePage/MoviePage.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from 'app_config';
import { isNotEmpty } from 'app_services/UtilsService';
import { col_classes } from 'app_services/FormatterService';
import { MoviePlayer, CrewNames, MovieTopInfo } from 'app_components/pages/movie-details-page/blocks';
import noImageAvailable from 'app_assets/img/image_not_available.png';
// import { ProgressBar } from 'app_components/layout';

function MoviePage({ movie, isLoading }) {
  const { poster_path, overview } = movie;

  // console.log('-- MoviePage.render(), movie:', movie);

  // base component class
  const b = b_.B({ modSeparator: '--' }).with('movie-details');

  // classes for keeping 16by9 aspect ration
  const cls_embed = 'embed-responsive';
  const keepAspectRatio = true;

  const cls = {
    poster: cn(col_classes(4), b('column', { left: true }), {
      [cls_embed]: keepAspectRatio
    }),
    image: cn(b('poster'), {
      [`${cls_embed}-item`]: keepAspectRatio,
      'no-image': !poster_path
    }),
    player: cn(col_classes(8), b('column'), {
      [cls_embed]: keepAspectRatio,
      [`${cls_embed}-16by9`]: keepAspectRatio
    })
  };

  return (
    <div className={cn(b(), 'container')}>
      {/* TODO: обеспечить абсолютное позиционирование чтобы избежать прыжка контента при окончании загрузки даных  */}
      {/* {isLoading && <ProgressBar />} */}

      {isNotEmpty(movie) &&
        <Fragment>
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
            <div className={cls.poster}>
              <img
                className={cls.image}
                src={poster_path
                  ? `${TMDB_IMAGE_URL.large}/${poster_path}`
                  : noImageAvailable
                }
              />
            </div>
            {/* col end */}

            {/* col start: player*/}
            <div className={cls.player}>
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
        </Fragment>
      }
    </div>
  );
};

MoviePage.propTypes = {
  movie: PT.shape({
    poster_path: PT.string,
    overview: PT.string,
  }).isRequired,
};

export default MoviePage;