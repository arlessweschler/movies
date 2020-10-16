import React from 'react';
import PropTypes from 'prop-types';

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

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Layout;