import './LocaleDropdown.scss';

import React, { useState } from 'react';
import PT from 'prop-types';
import { useLocation } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import qs from 'query-string';

import { redirect } from 'app_history';
import { isNotEmpty } from 'app_services/UtilsService';
import { LANGUAGES, DEFAULT_LANGUAGE } from 'app_i18n';

const LocaleDropdown = (props) => {
  const { i18n } = props;
  const location = useLocation();
  const { lng: langQuery } = qs.parse(location.search);

  const defaultLang = getDefaultLang(langQuery);
  const [lang, setLang] = useState(defaultLang);

  function getDefaultLang(queryValue) {
    if (!queryValue) return DEFAULT_LANGUAGE;

    const result = LANGUAGES.find(i => i.value == queryValue);

    return isNotEmpty(result)
      ? result
      : DEFAULT_LANGUAGE;
  }

  function onLangChange(e, location, nextLang) {
    e.preventDefault();

    const { pathname, search } = location;
    const searchObj = qs.parse(search);
    const nextSearchQuery = qs.stringify({
      ...searchObj,
      lng: nextLang.value
    });

    setLang(nextLang);
    i18n.changeLanguage(nextLang.value);
    redirect(`${pathname}?${nextSearchQuery}`);
  };

  return (
    <div className="locale-dropdown__wrapper">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
        >
          {lang.label}
        </button>

        <div className="dropdown-menu">
          {LANGUAGES.map((item) =>
            <a
              key={uuidv4()}
              className="dropdown-item"
              href=""
              onClick={(e) => onLangChange(e, location, item)}
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