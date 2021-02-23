import styles from './FooterLink.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

const FooterLink = ({
  url,
  textBefore,
  textAfter,
  cls = '',
  children
}) => (
  <div className={cn(styles.wrapper, cls)}>
    <span>{textBefore}</span>

    <a
      className={styles.link}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>

    {textAfter && <span>{textAfter}</span>}
  </div>
);

FooterLink.propTypes = {
  url: PT.string.isRequired,
  textBefore: PT.string,
  textAfter: PT.string,
  cls: PT.string,
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};

export default FooterLink;