import './CardImageBlock.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { withTranslation } from 'react-i18next';
import { withMListContext } from 'app_contexts';
import { TMDB_IMAGE_URL } from 'app_config';
import { CardRatingBlock } from
  'app_components/pages/movies-page/_blocks';

function CardImageBlock(props) {
  const { t, cls, movie } = props;
  const { poster_path, vote_average } = movie;

  const b = b_.with(cls);
  const imageSrc = `${TMDB_IMAGE_URL.medium}/${poster_path}`;

  return (
    <div className={b('image-wrapper')}>

      {poster_path
        ? (
          <Fragment>
            {
              (typeof window == 'undefined')
                ? (<img
                  className={b('image')}
                  src={imageSrc}
                />)
                : (<LazyLoadImage
                  src={imageSrc}
                  effect="black-and-white"
                  wrapperClassName="lazy-wrapper"
                />)
            }
          </Fragment>
        )
        : (
          <div className="no-image-text">
            {t('movie_list.empty_poster')}
          </div>
        )
      }

      <CardRatingBlock
        vote_average={vote_average}
        cls={cls}
      />
    </div>
  );
};

CardImageBlock.propTypes = {
  t: PT.func.isRequired,

  movie: PT.shape({
    poster_path: PT.string,
    vote_average: PT.number,
  }).isRequired
};

export default
  withTranslation()
    (withMListContext(CardImageBlock));