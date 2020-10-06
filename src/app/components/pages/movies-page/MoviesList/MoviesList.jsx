import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TMDB_IMAGE_URL } from 'app_services/ApiMovies.service';

export default function MoviesListPage({ list = null, message = '' }) {
  return (
    <React.Fragment>
      {message && <p>{message}</p>}

      {list && <div className="d-flex flex-wrap justify-content-between movies-list">
        {list.map(function ({ poster_path, title }, index) {
          return (
            <div className="card" key={uuidv4()}>
              <img src={`${TMDB_IMAGE_URL.small}/${poster_path}`} />
              <div className="card-body">{title}</div>
            </div>

          );
        })}
      </div>}
    </React.Fragment>
  );
}