import styles from './Highlight.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

const Highlight = ({
  isQuoted = false,
  cls = '',
  children
}) => {

  const quotes = (
    <span className={styles.quotes}>
      &quot;
    </span>
  );

  return (
    <span className={cn(styles.highlight, cls)}>
      {isQuoted && quotes}
      {children}
      {isQuoted && quotes}
    </span>
  );
};

Highlight.propTypes = {
  isQuoted: PT.bool,
  cls: PT.string,
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired,
};

export default Highlight;