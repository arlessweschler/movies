import './CardRatingBlock.scss';

import React from 'react';
import PT from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function CardRatingBlock({ vote_average }) {
  if (!vote_average) return null;

  return (
    <span className="list-card__rating">
      <FontAwesomeIcon
        className="mr-1"
        icon={faStar}
      />
      {vote_average}
    </span>
  );
}

CardRatingBlock.propTypes = {
  vote_average: PT.number.isRequired,
};

export default CardRatingBlock;