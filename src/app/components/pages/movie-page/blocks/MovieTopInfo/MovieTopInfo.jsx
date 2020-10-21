import React from 'react';
import PT from 'prop-types';

import { withMovieCardContext } from 'app_hocs';
import { Title, Tags, Rating } from 'app_components/pages/movie-page/blocks';
import { Row, Column } from 'app_components/layout';

function MovieTopInfo({ context }) {
  const { movie } = context;
  const { title, production_countries, genres, release_date, runtime, vote_average } = movie;

  const moviePageCls = 'movie-details';

  return (
    <Row>
      <Column size={9} cls="p-0">
        <Title
          cls={moviePageCls}
          data={{ title, release_date }}
        />
        <Tags
          cls={`${moviePageCls}-top`}
          data={{ production_countries, genres, runtime }}
        />
      </Column>

      <Column size={3} cls="p-0">
        <Rating
          cls={`${moviePageCls}-rating`}
          data={{ vote_average }}
        />
      </Column>
    </Row>
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