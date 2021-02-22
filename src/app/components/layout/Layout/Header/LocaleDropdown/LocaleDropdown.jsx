/* eslint-disable import/no-unassigned-import */
/* eslint-disable global-require */
import styles from './LocaleDropdown.module.scss';

import React, { useState, useEffect } from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import { LANGUAGES, DEFAULT_LANGUAGE } from '@/constants/languages';
import { redirect } from '@/routing/history';
import { isEmpty } from '@/utils/common';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';

const LocaleDropdown = (props) => {
  const { i18n, history } = props;
  const { location } = history;
  const { lng: langQuery } = qs.parse(location.search);

  function findLang(queryValue) {
    if (!queryValue) return DEFAULT_LANGUAGE;

    const finded = LANGUAGES.find((i) => i.value === queryValue);

    return isEmpty(finded)
      ? DEFAULT_LANGUAGE
      : finded;
  }

  const defaultLang = findLang(langQuery);
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    require('bootstrap/js/dist/dropdown');
    require('bootstrap/js/dist/collapse');
  }, []);

  useEffect(() => {

    const unlisten = history.listen((loc, action) => {
      if (action === 'POP') {
        const { lng } = qs.parse(loc.search);

        const searchQueryDiff = Boolean(lng && lng !== lang.value);
        const defaultDiff = Boolean(typeof lng === 'undefined' && lang.value !== DEFAULT_LANGUAGE.value);

        if (searchQueryDiff || defaultDiff) {
          const newLang = findLang(lng);

          setLang(newLang);
          i18n.changeLanguage(newLang.value);
        }
      }
    });

    return () => { unlisten(); };
  }, [lang]);

  function onLangChange(e, loc, nextLang) {
    e.preventDefault();

    const { pathname, search } = loc;
    const nextSearchQuery = qs.stringify({
      ...qs.parse(search),
      lng: nextLang.value
    });

    setLang(nextLang);
    i18n.changeLanguage(nextLang.value);
    redirect(`${pathname}?${nextSearchQuery}`);
  }

  return (
    <div className={styles.wrapper}>
      <div className="dropdown">
        <DropdownToggle label={lang.label} />

        <DropdownMenu
          clickHandler={onLangChange}
          location={location}
        />
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