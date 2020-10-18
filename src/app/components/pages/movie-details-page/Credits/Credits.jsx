import 'app_components/pages/movie-details-page/Credits/Credits.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { isNotEmpty } from 'app_services/UtilsService';
import { TMDB_IMAGE_URL } from 'app_config';

function Credits({ credits }) {
  const { cast } = credits;

  // console.log('-- Credits.render(), credits:', credits);

  return (
    <div className="container mt-3">
      {
        isNotEmpty(cast)
          ?
          <Fragment>
            <h2>Actors:</h2>
            <div className="row">

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
          </Fragment>
          : ''
      }
    </div>
  );
};

Credits.propTypes = {
  cast: PT.array,
};

export default Credits;