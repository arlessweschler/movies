import React, { Fragment } from 'react';

// import NavLinks from './NavLinks';

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
        {/* <NavLinks /> */}

        {props.children}
      </div>
    </Fragment>
  );
}

export default NavToggle;