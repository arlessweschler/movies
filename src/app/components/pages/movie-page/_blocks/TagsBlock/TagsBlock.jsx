import './TagsBlock.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import b_ from 'b_';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory, faVideo, faGlobe, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

import { isNotEmpty, capitalize } from '@/services/UtilsService';

function TagsBlock({ t, data }) {
  const {
    production_countries, genres, release_date, runtime
  } = data;

  if (production_countries.length < 1 || genres.length < 1 || !runtime) return null;

  const getDuration = (mins) => {
    const h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? `0${m}` : m;
    return `${h}${t('movie_details.duration.hours')} ${m}${t('movie_details.duration.minutes')}`;
  };

  const getReleaseDate = (val) => moment(val).format('DD.MM.YYYY');

  const mapWithSemicolons = (list) => list.map((item, i) => {
    const value = (<span className="tag-value">{capitalize(item.name)}</span>);
    return (
      <Fragment key={uuidv4()}>
        {i !== (list.length - 1)
          ? (
            <>
              {value}
              <span className="tag-semicolon">,</span>
            </>
          )
          : value}
      </Fragment>
    );
  });

  const tags = [];

  const fields = [
    {
      value: genres, icon: faVideo, func: mapWithSemicolons, cls: 'genres'
    },
    {
      value: production_countries, icon: faGlobe, func: mapWithSemicolons, cls: 'countries'
    },
    {
      value: release_date, icon: faCalendarAlt, func: getReleaseDate, cls: 'release-date'
    },
    {
      value: runtime, icon: faHistory, func: getDuration, cls: 'runtime'
    },
  ];

  fields.forEach(({
    value, icon, cls, func
  }) => {
    if (isNotEmpty(value)) {
      tags.push({ icon, cls, text: func(value) });
    }
  });

  const b = b_.B({ modSeparator: '--' }).with('movie-details-tags');

  return (
    <div className={b()}>
      {tags.map((item) => (
        <span
          key={uuidv4()}
          className={b('item', { [item.cls]: true })}
        >
          <FontAwesomeIcon
            className={b('icon')}
            icon={item.icon}
          />
          <span className={b('text')}>
            {item.text}
          </span>
        </span>
      ))}
    </div>
  );
}

TagsBlock.propTypes = {
  t: PT.func.isRequired,

  data: PT.shape({
    production_countries: PT.array,
    genres: PT.array,
    release_date: PT.string,
    runtime: PT.number
  }).isRequired
};

export default withTranslation()(TagsBlock);