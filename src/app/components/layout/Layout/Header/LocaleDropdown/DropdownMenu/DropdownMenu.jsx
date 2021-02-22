import styles from './DropdownMenu.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { LANGUAGES } from '@/constants/languages';

const DropdownMenu = ({ clickHandler, location }) => (
  <div
    className={cn(styles.menu, 'dropdown-menu')}
    data-test="dropdown-menu--locale"
  >
    {LANGUAGES.map((item, index) => (
      <span
        key={index}
        className={cn(styles.item, 'dropdown-item')}
        onClick={(e) => clickHandler(e, location, item)}
        data-test="dropdown-item"
      >
        {item.label}
      </span>
    ))}
  </div>
);

DropdownMenu.propTypes = {
  clickHandler: PT.func.isRequired,
  location: PT.shape({
    pathname: PT.string.isRequired,
    search: PT.string
  }).isRequired
};

export default DropdownMenu;