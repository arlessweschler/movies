import './Layout.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';

import { Header, Footer } from 'app_components/layout';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main className="layout">
        <div className="container position-relative p-0">
          {props.children}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}

Layout.propTypes = {
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ])
};

export default Layout;