import React from 'react';

import { CrewNames } from 'app_components/pages/movie-page/_blocks';
import { Row } from 'app_components/layout';

function CrewSection() {
  return (
    <section className="mb-3">
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