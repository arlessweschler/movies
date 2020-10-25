import './NavToggle.scss';

import React, { Fragment } from 'react';

const NavToggle = (props) => {
  return (
    <Fragment>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse" data-target="#moviesNavbarToggle"
        aria-controls="moviesNavbarToggle"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse"
        id="moviesNavbarToggle"
      >
        <div className="row nav-toggle__row">
          {props.children}
        </div>
      </div>
    </Fragment>
  );
}

export default NavToggle;