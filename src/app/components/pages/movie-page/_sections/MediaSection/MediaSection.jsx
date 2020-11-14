import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { withMDetailsContext } from 'app_contexts';
import { Section } from 'app_components/pages/movie-page/_sections';
import { PlayerBlock, PosterBlock } from 'app_components/pages/movie-page/_blocks';
import { Row, Column } from 'app_components/layout';

function MediaSection({ transparent = true, context }) {
  const { movie, cls_base } = context;
  const { poster_path } = movie;

  // console.log('-- MediaSection.render(), context:', context);

  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  // classes for keeping 16by9 aspect ration
  const clsEmbed = 'embed-responsive';
  const keepAspectRatio = true;

  const cls = {
    posterCol: cn(b('column', { left: true }), {
      [clsEmbed]: keepAspectRatio
    }),
    poster: cn({
      [`${clsEmbed}-item`]: keepAspectRatio
    }),
    playerCol: cn(b('column'), {
      [clsEmbed]: keepAspectRatio,
      [`${clsEmbed}-16by9`]: keepAspectRatio
    })
  };

  return (
    <Section
      cls="px-0 pt-1 pb-4"
      {...{ transparent }}
    >
      <Row cls="px-3">
        <Column
          cls={cls.posterCol}
          size={4}
          smallFullWidth={true}
        >
          <PosterBlock
            cls={cn(b('poster'), cls.poster)}
            data={{ poster_path }}
          />
        </Column>

        <Column
          cls={cls.playerCol}
          size={8}
          smallFullWidth={true}
        >
          <PlayerBlock
            searchParams={{ site: 'YouTube', type: 'Trailer' }}
          />
        </Column>
      </Row>
    </Section>
  );
}

MediaSection.propTypes = {
  transparent: PT.bool,

  context: PT.shape({
    cls_base: PT.string.isRequired,
    movie: PT.shape({
      poster_path: PT.string
    }).isRequired
  }).isRequired
};

export default withMDetailsContext(MediaSection);