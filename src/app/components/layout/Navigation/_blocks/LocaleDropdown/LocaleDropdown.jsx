import './LocaleDropdown.scss';

import React, { useState, useEffect } from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import qs from 'query-string';

import { redirect } from 'app_history';
import { isNotEmpty } from 'app_services/UtilsService';
import { LANGUAGES, DEFAULT_LANGUAGE } from 'app_i18n';

const LocaleDropdown = (props) => {
  const { i18n, history } = props;
  const location = history.location;
  const { lng: langQuery } = qs.parse(location.search);

  function findLang(queryValue) {
    if (!queryValue) return DEFAULT_LANGUAGE;

    const finded = LANGUAGES.find(i => i.value == queryValue);

    return isNotEmpty(finded)
      ? finded
      : DEFAULT_LANGUAGE;
  }

  const defaultLang = findLang(langQuery);
  const [lang, setLang] = useState(defaultLang);

  // console.warn('-- LocaleDropdown.render()');
  // console.log('lang:', lang);

  useEffect(() => {
    // console.warn('-- LocaleDropdown.useEffect()');

    const unlisten = history.listen((location, action) => {
      // console.warn('\n LocaleDropdown.listen(), action:', action);
      if (action == 'POP') {
        const { lng } = qs.parse(location.search);

        const searchQueryDiff = Boolean(lng && lng !== lang.value);
        const defaultDiff = Boolean(typeof lng == 'undefined' && lang.value !== DEFAULT_LANGUAGE.value);

        // console.log('lng:', lng);
        // console.log('lang:', lang);
        // console.log('searchQueryDiff:', searchQueryDiff);
        // console.log('defaultDiff:', defaultDiff);

        if (searchQueryDiff || defaultDiff) {
          setLang(findLang(lng));
        }
      }
    });

    return () => {
      // console.warn('-- LocaleDropdown.unmount()');
      unlisten();
    };
  }, [lang]);

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
  }

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
          {LANGUAGES.map((item) => (
            <a
              key={uuidv4()}
              className="dropdown-item"
              href=""
              onClick={(e) => onLangChange(e, location, item)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

LocaleDropdown.propTypes = {
  i18n: PT.object.isRequired,

  history: PT.shape({
    listen: PT.func.isRequired,
    location: PT.shape({
      pathname: PT.string.isRequired,
      search: PT.string
    }).isRequired
  }).isRequired
};

export default withTranslation()(withRouter(LocaleDropdown));