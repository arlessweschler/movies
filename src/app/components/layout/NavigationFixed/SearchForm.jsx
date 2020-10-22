import React from 'react';

const SearchForm = (props) => {
  const searchText = 'Search by movie title';

  return (
    <form className="my-0 col-12 col-md-12 col-lg-6">
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