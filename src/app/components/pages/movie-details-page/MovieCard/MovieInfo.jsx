import React, { Fragment } from 'react';
import PT from 'prop-types';
import moment from 'moment';

import { isNotEmpty } from 'app_services/UtilsService';
import { MovieField, CrewNames } from 'app_components/pages';

function MovieInfo({ movie }) {
  const { title, tagline, overview, production_countries, genres, release_date, runtime, vote_average } = movie;

  const getDurationStr = mins => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? "0" + m : m;
    return `${h}h ${m}m`;
  };

  return (
    <Fragment>
      <h1>{title}</h1>
      {tagline && <p><b>{tagline}</b></p>}

      {/* released */}
      {release_date
        ? <MovieField
          label="Released"
          value={moment(release_date).format('YYYY')} />
        : ''}

      {/* country */}
      {isNotEmpty(production_countries)
        ? <MovieField
          label="Country"
          value={production_countries}
          mapWithSemicolons />
        : ''}

      {/* genre */}
      {isNotEmpty(genres)
        ? <MovieField
          label="Genre"
          value={genres}
          mapWithSemicolons />
        : ''}

      {/* director */}
      <CrewNames
        label="Director"
        searchParams={{ department: 'Directing', job: 'Director' }}
      />

      {/* screenplay */}
      <CrewNames
        label="Screenplay"
        searchParams={{ department: 'Writing', job: 'Screenplay' }}
      />

      {/* duration */}
      {runtime
        ? <MovieField
          label="Duration"
          value={getDurationStr(runtime)} />
        : ''}

      {/* vote_average */}
      {vote_average
        ? <MovieField
          label="Rating"
          value={vote_average} />
        : ''}

      {/* overview */}
      {overview
        ? <div className="border-top mt-3 pt-3">
          {overview}
        </div>
        : ''}

    </Fragment>
  );
};

MovieInfo.propTypes = {
  movie: PT.shape({
    title: PT.string,
    tagline: PT.string,
    overview: PT.string,
    production_countries: PT.array,
    genres: PT.array,
    release_date: PT.string,
    runtime: PT.number,
    vote_average: PT.number
  }).isRequired,
};

export default MovieInfo;