import styles from './Section.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

function Section({ cls = '', transparent, children }) {
  if (!children) return null;

  return (
    <section className={cn(styles.section, cls, {
      [styles.transparent]: transparent
    })}
    >
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