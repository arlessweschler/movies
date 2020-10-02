// import "./Navigation.scss";
import React from "react";
import { Link } from "react-router-dom";
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export default function Navigation(props) {
  const { currentRoute } = props;
  const links = [
    { url: '/', text: 'Home' },
    { url: '/dashboard', text: 'DashboardPage' },
    { url: '/users', text: 'UsersContainer' },
    { url: '/unknown-route', text: 'PageNotFound' },
  ];

  return (
    <React.Fragment>
      <ul className="list-group list-group-horizontal cstm-nav">
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