import './HomeLink.scss';

import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import b_ from 'b_';
import qs from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import { DEFAULT_QUERY_PARAMS } from '@/constants/query-params';
import { redirect } from '@/routing/history';
import { getQueryParams } from '@/utils/url';
import { resetMovies, getMovies } from '@/actions';

const HomeLink = () => {
  const dispatch = useDispatch();

  const goHome = (e) => {
    e.preventDefault();
    const { lng } = getQueryParams();

    const requestParams = {
      ...DEFAULT_QUERY_PARAMS,
      lng
    };

    dispatch(resetMovies());
    dispatch(getMovies(requestParams));
    redirect(`/?${qs.stringify({ lng })}`);
  };

  const b = b_.B({ modSeparator: '--' }).with('home-link');

  return (
    <a
      href="/"
      className={b()}
      onClick={(e) => goHome(e)}
      data-test="home-link"
    >
      <FontAwesomeIcon
        className={cn(b('icon'), 'mr-1')}
        icon={faFilm}
        data-test="home-link__icon"
      />
      <span
        className={b('text')}
        data-test="home-link__text"
      >
        Movies
      </span>
    </a>
  );
};

export default HomeLink;