import './MoviePage.scss';

import React, { Fragment } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import { isNotEmpty } from 'app_services/UtilsService';
import { DescriptionSection, MediaSection, CrewSection, ActorsSection } from 'app_components/pages/movie-page/_sections';
import { Backdrop } from 'app_components/pages/movie-page/_blocks';

function MoviePage({ movie, isLoading }) {
  const { backdrop_path } = movie;

  // console.log('-- MoviePage.render(), movie:', movie);

  // base component class
  const cls_base = 'movie-details';
  const b = b_.with(cls_base);

  return (
    <Fragment>
      {isNotEmpty(movie) &&
        <Fragment>
          <Backdrop data={{ backdrop_path }} />

          <div className={cn(b())}>

            {/* TODO: обеспечить абсолютное позиционирование чтобы избежать прыжка контента при окончании загрузки даных  */}
            {/* {isLoading && <ProgressBar />} */}

            <DescriptionSection
              cls_base={cls_base}
              transparent={true}
            />

            <MediaSection
              cls_base={cls_base}
              transparent={true}
            />

            <CrewSection
              cls_base={cls_base}
              transparent={false}
            />

            <ActorsSection
              cls_base={cls_base}
              transparent={false}
            />

          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default MoviePage;