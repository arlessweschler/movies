import './Page.scss';

import React from 'react';
import PT from 'prop-types';

function Page({ children }) {
  if (!children) return null;

  return (
    <div className="page-content">
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