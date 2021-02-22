import styles from './SearchInput.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { DebounceInput } from 'react-debounce-input';

const SearchInput = ({
  value,
  onChange,
  placeholder
}) => (
  <DebounceInput
    debounceTimeout={600}
    autoComplete="off"
    spellCheck={false}
    className={cn(styles.input, 'form-control',
      { 'active': value })}
    type="text"
    name="search"
    placeholder={placeholder}
    aria-label={placeholder}
    value={value}
    onChange={onChange}
    data-test="search-form__input"
  />
);

SearchInput.propTypes = {
  value: PT.string.isRequired,
  placeholder: PT.string.isRequired,
  onChange: PT.func.isRequired
};

export default SearchInput;