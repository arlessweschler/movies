import './SearchForm.scss';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PT from 'prop-types';
import cn from 'classnames';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { redirect } from 'app_history';
import { resetMovies } from 'redux_actions';

const SearchForm = ({ t, history }) => {
  const dispatch = useDispatch();
  const searchPlaceholder = t('movie_search.input_placeholder');
  const { search = '' } = qs.parse(history.location.search);

  // console.warn('-- SearchForm.render()');
  // console.log('history.location.search:', history.location.search);

  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    // console.warn('-- SearchForm.useEffect()');

    const unlisten = history.listen(() => {
      const { search = '' } = qs.parse(history.location.search);

      // console.warn('\n SearchForm.listen(), action:', action);
      // console.log('search:', search);

      setSearchText(search);
    });

    return () => {
      // console.warn('-- LocaleDropdown.unmount()');
      unlisten();
    };
  }, [searchText]);

  const onInputChange = (e) => {
    const value = e.target.value;
    const queryParams = qs.parse(history.location.search);

    if (value.length >= 2) {
      queryParams.search = value;
      queryParams.page = 1;
    } else {
      delete queryParams.search;
    }

    setSearchText(value);
    dispatch(resetMovies());
    redirect(`/?${qs.stringify(queryParams)}`);
  };

  return (
    <form className="search-form">
      <FontAwesomeIcon
        className="search-icon"
        icon={faSearch}
      />
      <DebounceInput
        debounceTimeout={300}
        autoComplete="off"
        spellCheck={false}
        className={cn('form-control', { 'active': searchText })}
        type="text"
        name="search"
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        value={searchText}
        onChange={onInputChange}
      />
    </form>
  );
};

SearchForm.propTypes = {
  t: PT.func.isRequired,

  history: PT.shape({
    listen: PT.func.isRequired,
    location: PT.shape({
      search: PT.string.isRequired
    }).isRequired
  }).isRequired
};

export default withTranslation()(withRouter(SearchForm));