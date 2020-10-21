import './Rating.scss';

import React from 'react';
import PT from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import b_ from 'b_';

function Rating({ cls, data }) {
  const { vote_average } = data;
  const b = b_.with(cls);

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
    </div>
  );
};

Rating.propTypes = {
  cls: PT.string.isRequired,

  data: PT.shape({
    vote_average: PT.number
  }).isRequired
};

export default Rating;