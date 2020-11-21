import React from 'react';
import PT from 'prop-types';

import { Section, Row, Column } from '@/markup';
import TitleBlock from './TitleBlock';
import TagsBlock from './TagsBlock';
import RatingBlock from './RatingBlock';
import CrewListBlock from './CrewListBlock';

function DescriptionSection({ movie }) {
  const {
    title,
    original_title,
    genres,
    release_date,
    runtime,
    tagline,
    overview,
    vote_average,
    vote_count,
    production_countries
  } = movie;

  return (
    <Section transparent={true}>
      <Row>
        <Column size={9} cls="p-0">
          <TitleBlock
            data={{
              title,
              release_date,
              original_title
            }}
          />
        </Column>

        <Column size={3} cls="p-0">
          <RatingBlock
            data={{
              vote_average,
              vote_count
            }}
          />
        </Column>
      </Row>

      <TagsBlock
        data={{
          production_countries,
          genres,
          release_date,
          runtime
        }}
      />

      <CrewListBlock />

      {(tagline || overview) && <hr />}

      <Row cls="tagline">
        {tagline}
      </Row>

      <Row>
        {overview}
      </Row>
    </Section>
  );
}

DescriptionSection.propTypes = {
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
};

export default DescriptionSection;