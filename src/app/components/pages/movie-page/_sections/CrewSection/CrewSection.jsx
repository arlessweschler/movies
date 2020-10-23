import React from 'react';
import b_ from 'b_';
import cn from 'classnames';

import { CrewNames } from 'app_components/pages/movie-page/_blocks';
import { Row } from 'app_components/layout';

function CrewSection({ cls_base, transparent }) {
  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  return (
    <section className={cn(b('section', { "is-transparent": transparent }))}>
      <Row>
        <CrewNames
          label="Director"
          searchParams={{ department: 'Directing', job: 'Director' }}
        />
      </Row>

      <Row>
        <CrewNames
          label="Screenplay"
          searchParams={{ department: 'Writing', job: 'Screenplay' }}
        />
      </Row>
    </section>
  );
};

export default CrewSection;