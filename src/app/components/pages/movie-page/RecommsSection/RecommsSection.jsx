import React from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';

import { isEmpty } from '@/utils/common';
import GenresContainer from '@/containers/features/GenresContainer';
import { Message } from '@/markup';
import { ListBlock } from '@/pages/movies-page';

function RecommsSection({ t, movies }) {
  if (isEmpty(movies)) return null;

  return (
    <div className="mt-3">
      <Message>
        <h2 className="mb-0">
          {t('movie_details.recommendations.section_label')}
          :
        </h2>
      </Message>

      <GenresContainer>
        <ListBlock movies={movies} />
      </GenresContainer>
    </div>
  );
}

RecommsSection.propTypes = {
  t: PT.func.isRequired,
  movies: PT.array.isRequired
};

export default withTranslation()(RecommsSection);