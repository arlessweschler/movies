import './SearchForm.scss';

import React from 'react';

const SearchForm = () => {
  const searchText = 'Search by movie title';

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

export default SearchForm;