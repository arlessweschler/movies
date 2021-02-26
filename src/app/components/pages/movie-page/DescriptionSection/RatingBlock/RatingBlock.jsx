import styles from './RatingBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function RatingBlock({ t, data }) {
  const { vote_average, vote_count } = data;

  if (!vote_average) return null;

  return (
    <div className={styles.rating}>
      <FontAwesomeIcon
        className={styles.icon}
        icon={faStar}
      />
      {vote_average}
      <span className={styles.scale}>
        /10
      </span>

      {vote_count
        ? (
          <div className={styles.votes}>
            <span className={styles.votesLabel}>
              {vote_count}
            </span>

            <span className={styles.votesValue}>
              {t('movie_details.rating_votes.count', { count: vote_count })}
            </span>
          </div>
        )
        : ''}
    </div>
  );
}

RatingBlock.propTypes = {
  t: PT.func.isRequired,

  data: PT.shape({
    vote_average: PT.number,
    vote_count: PT.number
  }).isRequired
};

export default withTranslation()(RatingBlock);