import React from 'react';
import PT from 'prop-types';

import { withMDetailsContext } from '@/contexts';
import { TitleBlock, TagsBlock, RatingBlock, CrewListBlock } from '@/pages/movie-page/_blocks';
import { Section, Row, Column } from '@/markup';

function DescriptionSection({ context }) {
  const { movie } = context;

  return (
    <Section transparent={true}>
      <Row>
        <Column size={9} cls="p-0">
          <TitleBlock
            data={{
              title: movie.title,
              release_date: movie.release_date,
              original_title: movie.original_title
            }}
          />
        </Column>

        <Column size={3} cls="p-0">
          <RatingBlock
            data={{
              vote_average: movie.vote_average, vote_count: movie.vote_count
            }}
          />
        </Column>
      </Row>

      <TagsBlock
        data={{
          production_countries: movie.production_countries,
          genres: movie.genres,
          release_date: movie.release_date,
          runtime: movie.runtime
        }}
      />

      <CrewListBlock />

      {(movie.tagline || movie.overview) && <hr />}

      <Row cls="tagline">
        {movie.tagline}
      </Row>

      <Row>
        {movie.overview}
      </Row>
    </Section>
  );
}

DescriptionSection.propTypes = {
  context: PT.shape({
    movie: PT.shape({
      title: PT.string,
      original_title: PT.string,
      production_countries: PT.array,
      genres: PT.array,
      release_date: PT.string,
      runtime: PT.number,
      vote_average: PT.number,
      vote_count: PT.number,
      overview: PT.string,
      tagline: PT.string
    }).isRequired
  }).isRequired
};

export default withMDetailsContext(DescriptionSection);