import React from 'react'

import { Navigation } from 'app_components/layout';

const Layout = (props) => {
  return (
    <div className="layout-wrapper">
      <Navigation />
      <div className="layout-content">
        {props.children}
      </div>
    </div>
  );
}

export default Layout