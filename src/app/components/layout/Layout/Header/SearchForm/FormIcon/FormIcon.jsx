import styles from './FormIcon.module.scss';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const FormIcon = () => (
  <FontAwesomeIcon
    className={styles.icon}
    icon={faSearch}
    data-test="search-form__icon"
  />
);

export default FormIcon;