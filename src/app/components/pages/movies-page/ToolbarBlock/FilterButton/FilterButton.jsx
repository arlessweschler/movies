import styles from './FilterButton.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

const FilterButton = ({
  isActive,
  value,
  text,
  handler
}) => {

  const onClick = (e) => {
    const { moviesType } = e.target.dataset;
    handler(moviesType);
  };

  return (
    <button
      className={cn(styles.filterBtn, 'btn', {
        [`${styles.dark} btn-dark active`]: isActive,
        [`${styles.light} btn-light`]: !isActive,
      })}
      data-movies-type={value}
      data-test={value}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

FilterButton.propTypes = {
  isActive: PT.bool.isRequired,
  value: PT.string.isRequired,
  text: PT.string.isRequired,
  handler: PT.func.isRequired
};

export default FilterButton;