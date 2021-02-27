import styles from './CardImageBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';

import { TMDB_IMAGE_URL } from '@/constants/tmdb';
import CardRatingBlock from '../CardRatingBlock';

function CardImageBlock(props) {
  const { t, movie } = props;
  const { poster_path, vote_average } = movie;

  return (
    <div className={styles.wrapper}>
      {
        poster_path
          ? (
            <img
              width="185"
              height="278"
              className={styles.image}
              src={`${TMDB_IMAGE_URL.small}/${poster_path}`}
            />
          )
          : (
            <div className={styles.noImage}>
              {t('movie_list.empty_poster')}
            </div>
          )
      }

      <CardRatingBlock
        vote_average={vote_average}
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