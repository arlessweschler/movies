import './Navigation.scss';

import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import qs from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import { redirect } from '@/history';
import { getDefaulQueryParams, getQueryParams } from '@/services/UtilsService';
import { NavToggle, LocaleDropdown, SearchForm } from './_blocks';
import { resetMovies, getMovies } from '@/redux/actions';

const Navigation = () => {
  const dispatch = useDispatch();

  const goHome = (e) => {
    e.preventDefault();
    const { lng } = getQueryParams();

    const requestParams = {
      ...getDefaulQueryParams(),
      lng
    };

    dispatch(resetMovies());
    dispatch(getMovies(requestParams));
    redirect(`/?${qs.stringify({ lng })}`);
  };

  return (
    <nav className={cn('movies-navbar', 'navbar navbar-expand-sm navbar-dark')}>
      <div className="container p-0">
        <a
          href="/"
          className="link-home"
          onClick={(e) => goHome(e)}
        >
          <FontAwesomeIcon
            className="mr-1"
            icon={faFilm}
          />
          Movies
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