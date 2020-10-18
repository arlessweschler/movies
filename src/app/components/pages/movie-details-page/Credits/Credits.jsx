import 'app_components/pages/movie-details-page/Credits/Credits.scss';

import React from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { isNotEmpty } from 'app_services/UtilsService';
import { TMDB_IMAGE_URL } from 'app_config';
import noPhotoImage from 'app_assets/img/no_photo.png'

function Credits({ credits }) {
  const { cast } = credits;

  console.log('-- Credits.render(), credits:', credits);

  return (
    <div className="container">
      {
        isNotEmpty(cast)
          ? <div className="cast-list">
            <h2>Актеры:</h2>

            {cast.map((person) =>
              <div
                key={uuidv4()}
                className="cast-item"
              >
                {person.profile_path ? (
                  <img src={`${TMDB_IMAGE_URL.small + person.profile_path}`}
                  />
                ) : (
                    <img src={noPhotoImage}
                    />
                  )}

                {person.name}

                {person.character
                  ? <span className="small text-secondary p-1">
                    ({person.character})
                    </span>
                  : ''}
              </div>
            )}

          </div>
          : ''
      }
    </div>
  );
};

Credits.propTypes = {
  cast: PT.array,
};

export default Credits;