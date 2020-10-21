import React from 'react';
import cn from 'classnames';

export default function Column({ cls = '', size, smallFullWidth = false, children }) {
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
    classes.push(`col-${size}`, `col-sm-${size}`)
  }

  return (
    <div className={cn(classes, cls)}>
      {children}
    </div>
  );
};