import './MoviePage.scss';

import React, { Fragment } from 'react';
import b_ from 'b_';
import cn from 'classnames';

import history from 'app_history';
import { isNotEmpty } from 'app_services/UtilsService';
import { Backdrop } from 'app_components/layout';
import { DescriptionSection, MediaSection, ActorsSection, GallerySection } from 'app_components/pages/movie-page/_sections';
import { RecommendationsContainer } from 'app_containers';

function MoviePage({ movie }) {
  const { backdrop_path } = movie;

  // console.log('-- MoviePage.render(), movie:', movie);

  // base component class
  const cls_base = 'movie-details';
  const b = b_.with(cls_base);

  return (
    <Fragment>
      {isNotEmpty(movie) &&
        <Fragment>
          <Backdrop backdrop_path={backdrop_path} />

          <div className={cn(b())}>
            <DescriptionSection
              cls_base={cls_base}
              transparent={true}
            />

            <MediaSection
              cls_base={cls_base}
              transparent={true}
            />

            <ActorsSection
              cls_base={cls_base}
              transparent={false}
            />

            <GallerySection
              cls_base={cls_base}
              transparent={false}
            />

            <RecommendationsContainer
              // history={history}
            />
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default MoviePage;