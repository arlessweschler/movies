import './SearchForm.scss';

import React from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';

const SearchForm = (props) => {
  const { t } = props;
  const searchText = t('search_placeholder');

  return (
    <form className="search-form">
      <input
        className="form-control"
        type="text"
        placeholder={searchText}
        aria-label={searchText}
      />
    </form>
  );
}

SearchForm.propTypes = {
  t: PT.func.isRequired
};

export default withTranslation()(SearchForm);