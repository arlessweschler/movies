import 'app_components/layout/navigation/Navigation.scss';

import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default function Navigation() {
  const { pathname } = useLocation();

  const links = [
    { url: '/movies', text: 'Фильмы' },
    { url: '/movies/random-movie-id', text: 'Карточка фильма' },
    { url: '/users', text: 'Пользователи' },
    { url: '/users/random-user-id', text: 'Карточка пользователя' },
    { url: '/unknown-route', text: '404' },
  ];

  return (
    <Fragment>
      <ul className="list-group list-group-horizontal cstm-nav">
        <li className={cn("list-group-item", { 'active': ('/' == pathname) })}>
          <Link to='/'>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>

        {links.map(function (item) {
          const { url, text } = item;
          return (
            <li
              key={uuidv4()}
              className={cn("list-group-item", { 'active': (url == pathname) })}
            >
              <Link to={url}>{text}</Link>
            </li>
          );
        })
        }
      </ul>

      <hr />
    </Fragment>
  );
}