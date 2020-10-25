import './LocaleDropdown.scss';

import React, { useState } from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { options } from 'app_i18n';

const LocaleDropdown = (props) => {
  const { i18n } = props;
  const [lang, setLang] = useState(options[0]);

  const onLangChange = (e, item) => {
    e.preventDefault();
    setLang(item);
    i18n.changeLanguage(item.value);
  };

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
          {lang.label}
        </button>

        <div
          className="dropdown-menu" aria-labelledby="dropdownMenuButton"
        >
          {options.map((item) =>
            <a
              key={uuidv4()}
              className="dropdown-item"
              href=""
              onClick={(e) => onLangChange(e, item)}
            >
              {item.label}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

LocaleDropdown.propTypes = {
  i18n: PT.object.isRequired,
  t: PT.func.isRequired
};

export default withTranslation()(LocaleDropdown);