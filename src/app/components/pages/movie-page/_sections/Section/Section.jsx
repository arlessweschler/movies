import './Section.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { withMDetailsContext } from 'app_contexts';

function Section(props) {
  const { children, cls = '', transparent, context } = props;
  const { cls_base } = context;

  if (!children) return null;

  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  return (
    <section className={cn(b('section', { "is-transparent": transparent }), cls)}>
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
  ]).isRequired,

  context: PT.shape({
    cls_base: PT.string.isRequired
  }).isRequired
};

export default withMDetailsContext(Section);