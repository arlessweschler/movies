import './CardRatingBlock.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function CardRatingBlock(props) {
  const { cls, vote_average } = props;

  if (!vote_average) return null;

  const b = b_.with(cls);

  return (
    <span className={b('rating')}>
      <FontAwesomeIcon
        className={cn(b('icon'), 'mr-1')}
        icon={faStar}
      />
      {vote_average}
    </span>
  );
}

CardRatingBlock.propTypes = {
  cls: PT.string,
  vote_average: PT.number.isRequired,
};

export default CardRatingBlock;