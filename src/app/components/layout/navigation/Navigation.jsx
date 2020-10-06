import React from "react";
import { Link } from "react-router-dom";
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default function Navigation(props) {
  const { currentRoute } = props;
  const links = [
    { url: '/movies', text: 'Фильмы' },
    { url: '/users', text: 'Пользователи' },
    { url: '/users/random-user-id', text: 'Карточка пользователя' },
    { url: '/unknown-route', text: '404' },
  ];

  return (
    <React.Fragment>
      <ul className="list-group list-group-horizontal cstm-nav">
        <li className={cn("list-group-item", { 'active': ('/' == currentRoute) })}>
          <Link to='/'>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>

        {links.map(function (item) {
          const { url, text } = item;
          return (
            <li
              key={uuidv4()}
              className={cn("list-group-item", { 'active': (url == currentRoute) })}
            >
              <Link to={url}>{text}</Link>
            </li>
          );
        })
        }
      </ul>

      <hr />
    </React.Fragment>
  );
}