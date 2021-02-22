import styles from './NavToggle.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

const toggleID = 'headerNavToggle';

const NavToggle = (props) => (
  <>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse" data-target={`#${toggleID}`}
      aria-controls={toggleID}
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div
      id={toggleID}
      className="collapse navbar-collapse"
    >
      <div className={cn(styles.wrapper, 'row')}>
        {props.children}
      </div>
    </div>
  </>
);

NavToggle.propTypes = {
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};

export default NavToggle;