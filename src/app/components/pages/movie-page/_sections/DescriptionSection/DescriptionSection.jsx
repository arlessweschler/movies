import React from 'react';
import PT from 'prop-types';

import { withMDetailsContext } from 'app_contexts';
import { Section } from 'app_components/pages/movie-page/_sections';
import { TitleBlock, TagsBlock, RatingBlock, CrewListBlock } from 'app_components/pages/movie-page/_blocks';
import { Row, Column } from 'app_components/layout';

function DescriptionSection({ transparent = true, context }) {
  const { movie, cls_base } = context;

  return (
    <Section {...{ transparent }}>
      <Row>
        <Column size={9} cls="p-0">
          <TitleBlock
            cls={cls_base}
            data={{
              title: movie.title,
              release_date: movie.release_date,
              original_title: movie.original_title
            }}
          />
        </Column>

        <Column size={3} cls="p-0">
          <RatingBlock
            cls={`${cls_base}-rating`}
            data={{
              vote_average: movie.vote_average, vote_count: movie.vote_count
            }}
          />
        </Column>
      </Row>

      <TagsBlock
        cls={`${cls_base}-top`}
        data={{
          production_countries: movie.production_countries,
          genres: movie.genres,
          runtime: movie.runtime
        }}
      />

      <CrewListBlock
        cls={`${cls_base}-crew`}
      />

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
  transparent: PT.bool,

  context: PT.shape({
    cls_base: PT.string.isRequired,
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