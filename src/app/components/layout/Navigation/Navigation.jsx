import './Navigation.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import {
  NavToggle,
  LocaleDropdown,
  SearchForm
} from 'app_components/layout/Navigation/_blocks/';

const Navigation = () => {
  const cls_base = 'movies-navbar';

  return (
    <nav className={cn(cls_base, 'navbar navbar-expand-sm navbar-dark')}>
      <div className="container p-0">

        <Link to='/' className="link-home">
          <FontAwesomeIcon
            className="mr-1"
            icon={faFilm} />
              Movies
          </Link>

        <NavToggle>
            <SearchForm />
            <LocaleDropdown />
        </NavToggle>

      </div>
    </nav>
  );
}

export default Navigation;