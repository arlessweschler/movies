import './RatingBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function RatingBlock({ t, data }) {
  const { vote_average, vote_count } = data;
  const b = b_.with('movie-details-rating');

  if (!vote_average) return null;

  return (
    <div className={b()}>
      <FontAwesomeIcon
        className={b('icon')}
        icon={faStar}
      />
      {vote_average}
      <span className={b('scale')}>
        /10
      </span>

      {vote_count
        ? (
          <div className={b('votes')}>
            <span className={b('votes-label')}>
              {vote_count}
            </span>
            <span className={b('votes-value')}>
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