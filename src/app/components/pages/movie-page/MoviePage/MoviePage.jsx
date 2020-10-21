import './MoviePage.scss';

import React, { Fragment } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import { isNotEmpty } from 'app_services/UtilsService';
import { DescriptionSection, MediaSection, CrewSection, ActorsSection } from 'app_components/pages/movie-page/_sections';

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

          <DescriptionSection
            cls_base={cls_base}
          />

          <MediaSection
            cls_base={cls_base}
          />

          <CrewSection />
          
          <ActorsSection />
        </Fragment>
      }
    </div>
  );
};

export default MoviePage;