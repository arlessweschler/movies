import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { withMDetailsContext } from 'app_contexts';
import { PlayerBlock, PosterBlock } from 'app_components/pages/movie-page/_blocks';
import { Section, Row, Column } from 'app_components/layout';

function MediaSection({ context }) {
  const { movie } = context;
  const { poster_path } = movie;

  // classes for keeping 16by9 aspect ration
  const clsEmbed = 'embed-responsive';
  const keepAspectRatio = true;

  return (
    <Section
      cls="px-0 pt-1 pb-4"
      transparent={true}
    >
      <Row cls="px-3">
        <Column
          cls={cn('pb-md-0 pb-4', {
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
          cls={cn({
            [clsEmbed]: keepAspectRatio,
            [`${clsEmbed}-16by9`]: keepAspectRatio
          })}
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
  context: PT.shape({
    movie: PT.shape({
      poster_path: PT.string
    }).isRequired
  }).isRequired
};

export default withMDetailsContext(MediaSection);