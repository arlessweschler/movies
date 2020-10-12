import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TMDB_IMAGE_URL } from 'app_services/ApiMovies.service';
import { isNotEmpty } from 'app_services/Utils.service';

export default function MoviesListPage({
  isLoading = false,
  error = false,
  movies = null,
  genres = null
}) {
  const getGenres = function (ids) {
    return ids
      .map(id => {
        const item = genres.find && genres.find(item => item.id === id);
        return item ? item.name : null;
      })
      .join(', ');
  }

  return (
    <React.Fragment>
      {
        isLoading
          ? <p>'Загрузка...'</p>
          : ''
      }

      {
        error
          ? <p>{error}</p>
          : ''
      }

      {
        isNotEmpty(movies)
          ? <div className="d-flex flex-wrap justify-content-between movies-list">
            {movies.map(function ({ poster_path, title, genre_ids, vote_average }) {
              return (
                <div className="card" key={uuidv4()}>

                  {
                    poster_path
                      ? <img src={`${TMDB_IMAGE_URL.small}/${poster_path}`} />
                      : <div className="no-image" />
                  }
                  <div className="card-body">
                    {vote_average > 0 && (
                      <span className="card-rating">{vote_average}</span>
                    )}

                    <div className="card-title mb-1 mr-5">
                      {title}
                    </div>

                    {isNotEmpty(genres) && genre_ids && (
                      <div className="card-genres small">{getGenres(genre_ids)}</div>
                    )}
                  </div>
                </div>

              );

            })}
          </div>
          : ''
      }
    </React.Fragment >
  );
}