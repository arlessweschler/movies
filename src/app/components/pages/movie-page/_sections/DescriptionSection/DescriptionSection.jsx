import React from 'react';
import PT from 'prop-types';

import { withMDetailsContext } from 'app_contexts';
import { Section } from 'app_components/pages/movie-page/_sections';
import { TitleBlock, TagsBlock, RatingBlock, CrewListBlock } from 'app_components/pages/movie-page/_blocks';
import { Row, Column } from 'app_components/layout';

function DescriptionSection({ transparent = true, context }) {
  const { movie, cls_base } = context;
  const { title, original_title, production_countries, genres, release_date, runtime, vote_average, vote_count, tagline, overview } = movie;

  return (
    <Section {...{ transparent }}>
      <Row>
        <Column size={9} cls="p-0">
          <TitleBlock
            cls={cls_base}
            data={{ title, release_date, original_title }}
          />
        </Column>

        <Column size={3} cls="p-0">
          <RatingBlock
            cls={`${cls_base}-rating`}
            data={{ vote_average, vote_count }}
          />
        </Column>
      </Row>

      <TagsBlock
        cls={`${cls_base}-top`}
        data={{ production_countries, genres, runtime }}
      />

      <CrewListBlock
        cls={`${cls_base}-crew`}
      />

      {(tagline || overview) && <hr />}

      <Row cls="tagline">
        {tagline}
      </Row>

      <Row>
        {overview}
      </Row>
    </Section>
  );
};

DescriptionSection.propTypes = {
  transparent: PT.bool,

  context: PT.shape({
    cls_base: PT.string.isRequired,
    movie: PT.shape({
      title: PT.string,
      production_countries: PT.array,
      genres: PT.array,
      release_date: PT.string,
      runtime: PT.number,
      vote_average: PT.number,
      overview: PT.string
    }).isRequired
  }).isRequired
};

export default withMDetailsContext(DescriptionSection);