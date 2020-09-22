import React from 'react'

import Navigation from 'app_components/layout/navigation/Navigation';

const Layout = (props) => (
  <div className="layout">
    <Navigation />
    {props.children}
  </div>
);

export default Layout