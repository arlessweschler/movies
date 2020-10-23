import './Layout.scss';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Header, Footer } from 'app_components/layout';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main className="layout">
        <div className="container p-0">
          {props.children}
        </div>
      </main>
      <Footer />
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