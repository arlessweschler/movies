import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { withMovieCardContext } from 'app_hocs';
import { MoviePlayer, Poster } from 'app_components/pages/movie-page/_blocks';
import { Row, Column } from 'app_components/layout';

function MediaSection({ cls_base, transparent, context }) {
  const { movie } = context;
  const { poster_path } = movie;

  // console.log('-- MediaSection.render(), context:', context);

  const b = b_.B({ modSeparator: '--' }).with(cls_base);

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
    <section className={cn(b('section', { "is-transparent": transparent }), 'px-0 pt-4 pb-4')}>
      <Row cls="px-4">
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
    </section>
  );
};

MediaSection.propTypes = {
  cls_base: PT.string.isRequired,
  transparent: PT.bool.isRequired,

  context: PT.shape({
    movie: PT.shape({
      poster_path: PT.string
    }).isRequired
  }).isRequired
};

export default withMovieCardContext(MediaSection);