import styles from './Header.module.scss';

import React from 'react';
import cn from 'classnames';

import HomeLink from './HomeLink';
import NavToggle from './NavToggle';
import LocaleDropdown from './LocaleDropdown';
import SearchForm from './SearchForm';

const Header = () => (
  <header className="fixed-top">
    <nav className={cn(styles.nav, 'navbar navbar-expand-sm navbar-dark')}>
      <div className="container p-0">
        <HomeLink />
        <NavToggle>
          <SearchForm />
          <LocaleDropdown />
        </NavToggle>
      </div>
    </nav>
  </header>
);

export default Header;