import './Navigation.scss';

import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import b_ from 'b_';
import qs from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import { redirect } from '@/routing/history';
import { getDefaultQueryParams, getQueryParams } from '@/utils/url';
import { resetMovies, getMovies } from '@/actions';
import NavToggle from './NavToggle';
import LocaleDropdown from './LocaleDropdown';
import SearchForm from './SearchForm';

const Navigation = () => {
  const dispatch = useDispatch();

  const goHome = (e) => {
    e.preventDefault();
    const { lng } = getQueryParams();

    const requestParams = {
      ...getDefaultQueryParams(),
      lng
    };

    dispatch(resetMovies());
    dispatch(getMovies(requestParams));
    redirect(`/?${qs.stringify({ lng })}`);
  };

  const b = b_.B({ modSeparator: '--' }).with('home-link');

  return (
    <nav className={cn('movies-navbar', 'navbar navbar-expand-sm navbar-dark')}>
      <div className="container p-0">
        <a
          href="/"
          className={b()}
          onClick={(e) => goHome(e)}
        >
          <FontAwesomeIcon
            className={cn(b('icon'), 'mr-1')}
            icon={faFilm}
          />
          <span className={b('text')}>
            Movies
          </span>
        </a>

        <NavToggle>
          <SearchForm />
          <LocaleDropdown />
        </NavToggle>

      </div>
    </nav>
  );
};

export default Navigation;