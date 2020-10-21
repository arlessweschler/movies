import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { b_col } from 'app_services/UtilsService';
import { withMovieCardContext } from 'app_hocs';
import { Title, Tags, Rating } from 'app_components/pages/movie-page/blocks';

function MovieTopInfo({ context }) {
  const { movie } = context;
  const { title, production_countries, genres, release_date, runtime, vote_average } = movie;

  const moviePageCls = 'movie-details';

  return (
    <div className="row">

      {/* col start */}
      <div className={cn(b_col(9), 'p-0')}>
        {/* title */}
        <Title
          cls={moviePageCls}
          data={{ title, release_date }}
        />

        {/* tags */}
        <Tags
          cls={`${moviePageCls}-top`}
          data={{ production_countries, genres, runtime }}
        />
      </div>
      {/* col end */}

      {/* col start: rating */}
      <div className={cn(b_col(3), 'p-0')}>
        <Rating
          cls={`${moviePageCls}-rating`}
          data={{ vote_average }}
        />
      </div>
      {/* col end */}
    </div>
  );
};

MovieTopInfo.propTypes = {
  context: PT.shape({
    movie: PT.shape({
      title: PT.string,
      production_countries: PT.array,
      genres: PT.array,
      release_date: PT.string,
      runtime: PT.number,
      vote_average: PT.number
    }).isRequired
  }).isRequired
};

export default withMovieCardContext(MovieTopInfo);