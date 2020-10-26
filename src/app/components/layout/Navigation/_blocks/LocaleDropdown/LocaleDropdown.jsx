import './LocaleDropdown.scss';

import React, { useState } from 'react';
import PT from 'prop-types';
import { useLocation } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import qs from 'query-string';

import { redirect } from 'app_history';
import { isNotEmpty } from 'app_services/UtilsService';
import { 
  LANGUAGES, 
  DEFAULT_LANGUAGE_OBJ
} from 'app_i18n';

const LocaleDropdown = (props) => {
  const { i18n } = props;
  const { search: searchQuery } = useLocation();
  const { lng: langQuery } = qs.parse(searchQuery);

  const getDefaultLang = (queryValue) => {
    if (!queryValue) return DEFAULT_LANGUAGE_OBJ;

    const result = LANGUAGES.find(i => i.value == queryValue);

    return isNotEmpty(result)
      ? result
      : DEFAULT_LANGUAGE_OBJ;
  }

  // console.log('-- LocaleDropdown()');
  // console.log('langQuery:', langQuery);

  const defaultLang = getDefaultLang(langQuery);
  const [lang, setLang] = useState(defaultLang);
  // console.log('defaultLang:', defaultLang);

  const onLangChange = (e, query, nextLang) => {
    e.preventDefault();

    const searchObj = qs.parse(query)
    const nextSearchQuery = qs.stringify({
      ...searchObj,
      lng: nextLang.value
    })

    // console.log('-- onLangChange()');
    // console.log('nextSearchQuery:', nextSearchQuery);

    setLang(nextLang);
    i18n.changeLanguage(nextLang.value);
    redirect(`/movies?${nextSearchQuery}`);
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
          {LANGUAGES.map((item) =>
            <a
              key={uuidv4()}
              className="dropdown-item"
              href=""
              onClick={(e) => onLangChange(e, searchQuery, item)}
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