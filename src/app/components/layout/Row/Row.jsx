import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

function Row({ cls = '', children }) {
  if (!children) return null;

  return (
    <div className={cn('row', cls)}>
      {children}
    </div>
  );
}

Row.propTypes = {
  cls: PT.string,
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};

export default Row;