import React from 'react';

const NavLinks = () => {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">
          Home <span className="sr-only">
            (current)</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>

      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>

      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle" href="http://example.com"
          id="dropdown07"
          data-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false"
        >
          Genres
        </a>

        <div
          className="dropdown-menu"
          aria-labelledby="dropdown07"
        >
          <a
            className="dropdown-item"
            href="#"
          >
            Action
          </a>
          <a className="dropdown-item" href="#">
            Comedy
          </a>
          <a className="dropdown-item" href="#">
            Horror
          </a>
        </div>
      </li>
    </ul>
  );
}

export default NavLinks;