import './LocaleDropdown.scss';

import React, { useState, useEffect } from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import qs from 'query-string';

import history, { redirect } from 'app_history';
import { isNotEmpty } from 'app_services/UtilsService';
import { LANGUAGES, DEFAULT_LANGUAGE } from 'app_i18n';

const LocaleDropdown = (props) => {
  // console.warn('-- LocaleDropdown.render()');

  const { i18n } = props;
  const location = history.location;
  const { lng: langQuery } = qs.parse(location.search);

  const defaultLang = findLang(langQuery);
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    // console.warn('-- LocaleDropdown.useEffect()');

    const unlisten = history.listen((location, action) => {
      // console.warn('\n LocaleDropdown.listen()');

      if (action == 'POP') {
        const { lng } = qs.parse(location.search);

        if (
          Boolean(lng && lng !== lang.value) ||
          Boolean(typeof lng == 'undefined' && lang.value !== DEFAULT_LANGUAGE.value)
        ) {
          setLang(findLang(lng));
        }
      }
    });

    return () => {
      // console.warn('-- LocaleDropdown.unmount()');
      unlisten();
    };
  });

  function findLang(queryValue) {
    if (!queryValue) return DEFAULT_LANGUAGE;

    const finded = LANGUAGES.find(i => i.value == queryValue);

    return isNotEmpty(finded)
      ? finded
      : DEFAULT_LANGUAGE;
  }

  function onLangChange(e, location, nextLang) {
    e.preventDefault();

    const { pathname, search } = location;
    const nextSearchQuery = qs.stringify({
      ...qs.parse(search),
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