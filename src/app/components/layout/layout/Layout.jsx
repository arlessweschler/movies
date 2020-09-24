import React from 'react'
import { renderRoutes } from 'react-router-config';

import Navigation from 'app_components/layout/navigation/Navigation';

const Layout = (props) => {
  console.log('-- Layout, props:', props);
  
  const { children, route } = props;
  return (
    <div className="layout">
      <Navigation />
      {
        (route && route.routes)
          ? renderRoutes(route.routes)
          : children
      }
    </div>
  );
}

export default Layout