import styles from './SearchForm.module.scss';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PT from 'prop-types';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { redirect } from '@/routing/history';
import { resetMovies } from '@/actions';
import SearchFormIcon from './SearchFormIcon';
import SearchFormInput from './SearchFormInput';

const SearchForm = ({ t, history }) => {
  const dispatch = useDispatch();
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

  return (
    <form className={styles.form}>
      <SearchFormIcon />
      <SearchFormInput
        value={searchText}
        onChange={onInputChange}
        placeholder={t('movie_search.input_placeholder')}
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