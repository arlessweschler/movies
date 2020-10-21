import './MoviePage.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { isNotEmpty } from 'app_services/UtilsService';
import { MoviePlayer, CrewNames, MovieTopInfo, Poster } from 'app_components/pages/movie-page/blocks';
import { Row, Column } from 'app_components/layout';

function MoviePage({ movie, isLoading }) {
  const { poster_path, overview } = movie;

  // console.log('-- MoviePage.render(), movie:', movie);

  // base component class
  const b = b_.B({ modSeparator: '--' }).with('movie-details');

  // classes for keeping 16by9 aspect ration
  const cls_embed = 'embed-responsive';
  const keepAspectRatio = true;

  const cls = {
    poster_col: cn(b('column', { left: true }), {
      [cls_embed]: keepAspectRatio
    }),
    poster: cn({
      [`${cls_embed}-item`]: keepAspectRatio
    }),
    player_col: cn(b('column'), {
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

          <Row cls="mb-3">
            {overview}
          </Row>

          <Row>
            <Column
              cls={cls.poster_col}
              size={4} smallFullWidth
            >
              <Poster
                cls={cn(b('poster'), cls.poster)}
                data={{ poster_path }}
              />
            </Column>

            <Column
              cls={cls.player_col}
              size={8} smallFullWidth
            >
              <MoviePlayer
                searchParams={{ site: 'YouTube', type: 'Trailer' }}
              />
            </Column>
          </Row>

          <Row cls="mt-2">
            <CrewNames
              label="Director"
              searchParams={{ department: 'Directing', job: 'Director' }}
            />
          </Row>

          <Row>
            <CrewNames
              label="Screenplay"
              searchParams={{ department: 'Writing', job: 'Screenplay' }}
            />
          </Row>
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