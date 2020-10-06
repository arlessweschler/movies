import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TMDB_IMAGE_URL } from 'app_services/ApiMovies.service';

export default function MoviesListPage({ movies = null, genres = null, message = '' }) {

  const getGenres = function (ids) {
    return ids
      .map(id => {
        const item = genres.find(item => item.id === id);
        return item ? item.name : null;
      })
      .join(', ');
  }

  return (
    <React.Fragment>
      {message && <p>{message}</p>}

      {movies && <div className="d-flex flex-wrap justify-content-between movies-list">
        {movies.map(function ({ poster_path, title, genre_ids }) {
          return (
            <div className="card" key={uuidv4()}>
              <img src={`${TMDB_IMAGE_URL.small}/${poster_path}`} />
              <div className="card-body">
                <div className="mb-1">{title}</div>
                {genres && genre_ids && (
                  <div className="small">{getGenres(genre_ids)}</div>
                )}
              </div>
            </div>

          );
        })}
      </div>}
    </React.Fragment>
  );
}