import styles from './Page.module.scss';

import React from 'react';
import PT from 'prop-types';

function Page({ children }) {
  if (!children) return null;

  return (
    <div className={styles.page}>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};

export default Page;