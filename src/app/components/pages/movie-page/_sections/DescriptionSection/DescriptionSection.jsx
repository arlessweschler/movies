import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { withMovieCardContext } from 'app_hocs';
import { TitleBlock, TagsBlock, RatingBlock, CrewListBlock } from 'app_components/pages/movie-page/_blocks';
import { Row, Column } from 'app_components/layout';

function DescriptionSection({ cls_base, transparent, context }) {
  const { movie } = context;
  const { title, production_countries, genres, release_date, runtime, vote_average, overview } = movie;

  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  return (
    <section className={cn(b('section', { "is-transparent": transparent }))}>
      <Row>
        <Column size={9} cls="p-0">
          <TitleBlock
            cls={cls_base}
            data={{ title, release_date }}
          />
          <TagsBlock
            cls={`${cls_base}-top`}
            data={{ production_countries, genres, runtime }}
          />
        </Column>

        <Column size={3} cls="p-0">
          <RatingBlock
            cls={`${cls_base}-rating`}
            data={{ vote_average }}
          />
        </Column>
      </Row>

      <CrewListBlock
        cls={`${cls_base}-crew`}
      />

      <hr />

      <Row>
        {overview}
      </Row>
    </section>
  );
};

DescriptionSection.propTypes = {
  cls_base: PT.string.isRequired,
  transparent: PT.bool.isRequired,

  context: PT.shape({
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

export default withMovieCardContext(DescriptionSection);