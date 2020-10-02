import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Navigation() {
  const links = [
    { url: '/', text: 'Home' },
    { url: '/dashboard', text: 'DashboardPage' },
    { url: '/users', text: 'UsersContainer' },
    { url: '/unknown-route', text: 'PageNotFound' },
  ]
  return (
    <React.Fragment>
      <ul className="list-group">
        {links.map(function (item) {
          const { url, text } = item;
          return (
            <li
              key={uuidv4()}
              className="list-group-item"
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