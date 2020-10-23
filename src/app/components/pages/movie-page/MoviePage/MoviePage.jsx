import './MoviePage.scss';

import React, { Fragment } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from 'app_config';
import { isNotEmpty } from 'app_services/UtilsService';
import { DescriptionSection, MediaSection, CrewSection, ActorsSection } from 'app_components/pages/movie-page/_sections';

function MoviePage({ movie, isLoading }) {
  const { backdrop_path } = movie;

  // console.log('-- MoviePage.render(), movie:', movie);

  // base component class
  const cls_base = 'movie-details';
  const b = b_.with(cls_base);
  const sectionParams = { cls_base };

  const bgImagePath = `${TMDB_IMAGE_URL.large}${backdrop_path}`;

  return (
    <Fragment>
      {isNotEmpty(movie) &&
        <Fragment>
          <div
            className="movie-backdrop w-100 h-100 position-fixed fixed-top"
            style={{
              backgroundSize: "cover",
              backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${bgImagePath}")`
            }}
          />

          <div className={cn(b())}>

            {/* TODO: обеспечить абсолютное позиционирование чтобы избежать прыжка контента при окончании загрузки даных  */}
            {/* {isLoading && <ProgressBar />} */}

            <DescriptionSection
              {...sectionParams}
              transparent={true}
            />

            <MediaSection
              {...sectionParams}
              transparent={true}
            />

            <CrewSection
              {...sectionParams}
              transparent={false}
            />

            <ActorsSection
              {...sectionParams}
              transparent={false}
            />

          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default MoviePage;