import './Layout.scss';

import React from 'react';
import PT from 'prop-types';

import { Header, Footer, Backdrop } from '@/components/layout';

const Layout = (props) => (
  <>
    <Header />
    <main className="layout">
      <div className="container position-relative p-0">
        <Backdrop />
        {props.children}
      </div>
    </main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ])
};

export default Layout;