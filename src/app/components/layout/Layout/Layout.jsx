import './Layout.scss';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { NavigationFixed } from 'app_components/layout';

const Layout = (props) => {
  return (
    <Fragment>
      <NavigationFixed />
      <main className="layout">
        <div className="container p-0">
          {props.children}
        </div>
      </main>
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