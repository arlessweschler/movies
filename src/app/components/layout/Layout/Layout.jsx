import styles from './Layout.module.scss';

import React from 'react';
import PT from 'prop-types';

import { Backdrop } from '@/layout';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => (
  <>
    <Header />
    <main className="layoutOuter">
      <div className={styles.layoutInner}>
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