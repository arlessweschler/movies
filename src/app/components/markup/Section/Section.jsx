import './Section.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

function Section({ cls = '', transparent, children }) {
  if (!children) return null;

  const b = b_.B({ modSeparator: '--' }).with('page-content');

  return (
    <section className={cn(b('section', { 'is-transparent': transparent }), cls)}>
      {children}
    </section>
  );
}

Section.propTypes = {
  cls: PT.string,
  transparent: PT.bool.isRequired,
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};

export default Section;