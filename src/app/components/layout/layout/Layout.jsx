import React from 'react'

import { Navigation } from 'app_components/layout';

const Layout = (props) => {
  return (
    <div className="layout-wrapper container-fluid pt-3">
      <Navigation />
      <div className="layout-content">
        {props.children}
      </div>
    </div>
  );
}

export default Layout