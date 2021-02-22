import styles from './DropdownToggle.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

const DropdownToggle = ({ label }) => (
  <button
    className={cn(styles.toggle, 'dropdown-toggle btn btn-secondary')}
    type="button"
    data-toggle="dropdown"
    data-test="dropdown-toggle--locale"
  >
    {label}
  </button>
);

DropdownToggle.propTypes = {
  label: PT.string.isRequired
};

export default DropdownToggle;