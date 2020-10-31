import './SearchForm.scss';

import React, { useState } from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import qs from 'query-string';

import history from 'app_history';

const SearchForm = (props) => {
  const { t } = props;
  const searchPlaceholder = t('search_placeholder');

  const searchObject = qs.parse(history.location.search);
  const { search = '' } = searchObject;
/*   console.warn('-- SearchForm.render()');
  console.log('searchObject:', searchObject);
  console.log('search:', search); */

  const [searchText, setSearchText] = useState(search);

  const onInputChange = (e) => {
    const newSearchText = e.target.value;
    console.log('onInputChange(), newSearchText:', newSearchText);
    setSearchText(newSearchText);
  };

  return (
    <form className="search-form">
      <input
        className="form-control"
        type="text"
        name="search"
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        value={searchText}
        onChange={onInputChange}
      />
    </form>
  );
}

SearchForm.propTypes = {
  t: PT.func.isRequired
};

export default withTranslation()(SearchForm);