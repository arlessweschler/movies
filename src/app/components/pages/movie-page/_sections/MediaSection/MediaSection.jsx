import './MediaSection.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { withVideosContext } from '@/contexts';
import { Section, Row, Column } from '@/markup';
import { PlayerBlock, PosterBlock } from '@/pages/movie-page/_blocks';

function MediaSection({ poster_path, context }) {
  const { searchVideos } = context;

  // classes for keeping 16by9 aspect ration
  const clsEmbed = 'embed-responsive';
  const keepAspectRatio = true;

  const trailer = searchVideos({
    site: 'YouTube',
    type: 'Trailer'
  });

  return (
    <Section
      cls="px-0 pt-1 pb-4"
      transparent={true}
    >
      <Row
        cls={cn('px-3', {
          'row--has-videos': trailer
        })}
      >
        <Column
          cls={cn('column--poster', {
            [clsEmbed]: keepAspectRatio
          })}
          size={4}
          smallFullWidth={true}
        >
          <PosterBlock
            cls={cn({
              [`${clsEmbed}-item`]: keepAspectRatio
            })}
            data={{ poster_path }}
          />
        </Column>

        <Column
          cls={cn('column--trailer', {
            [clsEmbed]: keepAspectRatio,
            [`${clsEmbed}-16by9`]: keepAspectRatio
          })}
          size={8}
          smallFullWidth={true}
        >
          <PlayerBlock
            trailer={trailer}
          />
        </Column>
      </Row>
    </Section>
  );
}

MediaSection.propTypes = {
  poster_path: PT.string,

  context: PT.shape({
    searchVideos: PT.func.isRequired
  }).isRequired
};

export default withVideosContext(MediaSection);