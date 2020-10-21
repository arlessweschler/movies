import React from 'react';
import cn from 'classnames';

export default function Row({ cls = '', children }) {
  if (!children) return null;

  return (
    <div className={cn('row', cls)}>
      {children}
    </div>
  );
};