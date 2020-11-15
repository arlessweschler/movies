import './CardImageBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';

import { withTranslation } from 'react-i18next';
import { TMDB_IMAGE_URL } from 'app_settings_tmdb';
import { CardRatingBlock } from
  'app_components/pages/movies-page/_blocks';

function CardImageBlock(props) {
  const { t, movie } = props;
  const { poster_path, vote_average } = movie;
  const b = b_.with('list-card');

  return (
    <div className={b('image-wrapper')}>
      {
        poster_path
          ? (
            <img
              className={b('image')}
              src={`${TMDB_IMAGE_URL.medium}/${poster_path}`}
            />
          )
          : (
            <div className="no-image-text">
              {t('movie_list.empty_poster')}
            </div>
          )
      }

      <CardRatingBlock
        {...{ vote_average }}
      />
    </div>
  );
}

CardImageBlock.propTypes = {
  t: PT.func.isRequired,

  movie: PT.shape({
    poster_path: PT.string,
    vote_average: PT.number,
  }).isRequired
};

export default withTranslation()(CardImageBlock);