import './MoviePage.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { isNotEmpty } from 'app_services/UtilsService';
import { DescriptionSection, MediaSection } from 'app_components/pages/movie-page/_sections';
import { CrewNames } from 'app_components/pages/movie-page/_blocks';
import { Row } from 'app_components/layout';

function MoviePage({ movie, isLoading }) {
  // console.log('-- MoviePage.render(), movie:', movie);

  // base component class
  const cls_base = 'movie-details';
  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  return (
    <div className={cn(b(), 'container')}>

      {/* TODO: обеспечить абсолютное позиционирование чтобы избежать прыжка контента при окончании загрузки даных  */}
      {/* {isLoading && <ProgressBar />} */}

      {isNotEmpty(movie) &&
        <Fragment>

          <DescriptionSection cls_base={cls_base} />

          <MediaSection cls_base={cls_base} />

          <Row cls="mt-2">
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
        </Fragment>
      }
    </div>
  );
};

MoviePage.propTypes = {
  movie: PT.shape({
    poster_path: PT.string
  }).isRequired
};

export default MoviePage;