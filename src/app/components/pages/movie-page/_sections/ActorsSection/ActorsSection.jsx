import './ActorsSection.scss';

import React, { useState } from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';

import { TMDB_IMAGE_URL } from '@/settings/tmdb';
import { isNotEmpty } from '@/services/UtilsService';
import { withMDetailsContext } from '@/contexts';
import { Section } from '@/components/layout';
import { ToggleBlock } from '@/components/pages/movie-page/_blocks';
import noPhoto from '@/assets/img/no_photo.png';

function ActorsSection({ t, context }) {
  const { credits } = context;
  const { cast } = credits;
  const [showAll, setShowAll] = useState(false);

  if (!cast || cast.length < 1) return null;

  const list = showAll
    ? cast
    : cast.slice(0, 6);

  return (isNotEmpty(cast) &&
    <Section
      cls="pt-3"
      transparent={false}
    >
      <div className="row d-flex justify-content-between">
        <h2>
          {t('movie_details.actors.section_label')}
          {':'}
        </h2>

        {
          (cast.length > 6) &&
          <ToggleBlock
            handleToggle={() => setShowAll(!showAll)}
          />
        }
      </div>

      <div className="actors-grid">
        {list.map((person, index) => (
          <div
            key={index}
            className="actors-card"
          >
            <img
              className={cn('cast-image', { 'no-image': !person.profile_path })}
              src={person.profile_path
                ? `${TMDB_IMAGE_URL.small + person.profile_path}`
                : noPhoto}
            />

            <div className="cast-name">
              {person.name}
            </div>

            {
              person.character &&
              <div className="small text-secondary">
                {person.character}
              </div>
            }
          </div>
        ))}

      </div>
    </Section>);
}

ActorsSection.propTypes = {
  t: PT.func.isRequired,

  context: PT.shape({
    credits: PT.shape({
      cast: PT.array
    }).isRequired
  }).isRequired
};

export default withTranslation()(withMDetailsContext(ActorsSection));