import './ActorsSection.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { TMDB_IMAGE_URL } from 'app_config';
import { withMovieCardContext } from 'app_hocs';
import { isNotEmpty } from 'app_services/UtilsService';

function ActorsSection({ cls_base, transparent, context }) {
  const { credits } = context;
  const { cast } = credits;

  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  return (
    <Fragment>
      {
        isNotEmpty(cast)
          ?
          <section className={b('section', { "is-transparent": transparent })}>
            <div className="row">
              <h2>Actors:</h2>
            </div>

            <div className="row actors-row">

              {cast.map((person) =>
                <div
                  key={uuidv4()}
                  className="col cast-item"
                >

                  {/* photo */}
                  {person.profile_path ? (
                    <img
                      className="cast-image"
                      src={`${TMDB_IMAGE_URL.small + person.profile_path}`}
                    />
                  ) : (
                      <div className="cast-image no-image" />
                    )}

                  {/* name */}
                  <div className="cast-name">
                    {person.name}
                  </div>

                  {/* character */}
                  {person.character
                    ? <div className="small text-secondary">
                      ({person.character})
                      </div>
                    : ''}
                </div>
              )}

            </div>
          </section>
          : ''
      }

    </Fragment>
  );
};

ActorsSection.propTypes = {
  cls_base: PT.string.isRequired,
  transparent: PT.bool.isRequired,

  context: PT.shape({
    credits: PT.shape({
      cast: PT.array
    }).isRequired
  }).isRequired
};

export default withMovieCardContext(ActorsSection);