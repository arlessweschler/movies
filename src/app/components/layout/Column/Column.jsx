import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

function Column({ cls = '', size, smallFullWidth = false, children }) {
  if (!children) return null;

  let classes = [
    'col',
    `col-md-${size}`,
    `col-lg-${size}`,
    `col-xl-${size}`
  ];

  if (smallFullWidth) {
    classes.push('col-12', 'col-sm-12');
  } else {
    classes.push(`col-${size}`, `col-sm-${size}`);
  }

  return (
    <div className={cn(classes, cls)}>
      {children}
    </div>
  );
}

Column.propTypes = {
  cls: PT.string,
  size: PT.number,
  smallFullWidth: PT.bool,
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};

export default Column;