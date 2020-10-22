import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Navigation, NavigationFixed } from 'app_components/layout';

const Layout = (props) => {
  return (
    <Fragment>
      <NavigationFixed />
      <div className="layout-wrapper container pt-3">
        {/* <Navigation /> */}
        <div className="layout-content">
          {props.children}
        </div>
      </div>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Layout;