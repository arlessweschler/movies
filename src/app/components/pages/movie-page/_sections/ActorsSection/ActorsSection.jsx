import './ActorsSection.scss';

import React, { useState } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import noPhoto from 'app_assets/img/no_photo.png';
import { withTranslation } from 'react-i18next';
import { withMDetailsContext } from 'app_contexts';
import { TMDB_IMAGE_URL } from 'app_config';
import { isNotEmpty } from 'app_services/UtilsService';
import { Section } from 'app_components/pages/movie-page/_sections';
import { ToggleBlock } from 'app_components/pages/movie-page/_blocks';

function ActorsSection({ t, transparent = false, context }) {
  const { credits, cls_base } = context;
  const { cast } = credits;

  const b = b_.B({ modSeparator: '--' }).with(cls_base);
  const [showAll, setShowAll] = useState(false);

  if (!cast || cast.length < 1) return null;

  const list = showAll
    ? cast
    : cast.slice(0, 6);

  return (isNotEmpty(cast) &&
    <Section
      cls="pt-3"
      {...{ transparent }}
    >
      <div className="row d-flex justify-content-between">
        <h2>
          {t('movie_details.actors.section_label')}
          {':'}
        </h2>

        {
          (cast.length > 6) &&
          <ToggleBlock
            cls={b('toggle')}
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
  transparent: PT.bool,

  context: PT.shape({
    cls_base: PT.string.isRequired,
    credits: PT.shape({
      cast: PT.array
    }).isRequired
  }).isRequired
};

export default withTranslation()(withMDetailsContext(ActorsSection));