import './NavToggle.scss';

import React from 'react';
import PT from 'prop-types';

const NavToggle = (props) => {
  return (
    <>
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
    </>
  );
};

NavToggle.propTypes = {
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};

export default NavToggle;