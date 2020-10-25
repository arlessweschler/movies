import './LocaleDropdown.scss';

import React from 'react';

const LocaleDropdown = () => {
  return (
    <div className="locale-dropdown__wrapper">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          EN
      </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            RU
          </a>

          <a className="dropdown-item" href="#">
            EN
          </a>
        </div>
      </div>
    </div>
  );
}

export default LocaleDropdown;