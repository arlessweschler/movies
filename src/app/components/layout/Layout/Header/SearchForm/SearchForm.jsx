import './SearchForm.scss';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PT from 'prop-types';
import cn from 'classnames';
import b_ from 'b_';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { redirect } from '@/routing/history';
import { resetMovies } from '@/actions';

const SearchForm = ({ t, history }) => {
  const dispatch = useDispatch();
  const searchPlaceholder = t('movie_search.input_placeholder');
  const { search = '' } = qs.parse(history.location.search);

  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    const unlisten = history.listen(() => {
      const { search: newSearch = '' } = qs.parse(history.location.search);

      setSearchText(newSearch);
    });

    return () => {
      unlisten();
    };
  }, [searchText]);

  const resetAndRedirect = (params) => {
    dispatch(resetMovies());
    redirect(`/?${qs.stringify(params)}`);
  };

  const onInputChange = (e) => {
    const { value } = e.target;

    const queryParams = qs.parse(history.location.search);

    if (value.length >= 2) {
      queryParams.search = value;
      queryParams.page = 1;
      resetAndRedirect(queryParams);

    } else if (value.length === 0) {
      delete queryParams.search;
      delete queryParams.page;
      resetAndRedirect(queryParams);
    }

    setSearchText(value);
  };

  const b = b_.B({ modSeparator: '--' }).with('search-form');

  return (
    <form className={b()}>
      <FontAwesomeIcon
        className={b('icon')}
        icon={faSearch}
        data-test="search-form__icon"
      />
      <DebounceInput
        debounceTimeout={600}
        autoComplete="off"
        spellCheck={false}
        className={cn(b('input'), 'form-control', { 'active': searchText })}
        type="text"
        name="search"
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        value={searchText}
        onChange={onInputChange}
        data-test="search-form__input"
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