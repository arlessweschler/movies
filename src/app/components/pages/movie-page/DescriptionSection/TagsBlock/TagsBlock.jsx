import styles from './TagsBlock.module.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory, faVideo, faGlobe, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

import { isEmpty, capitalize } from '@/utils/common';

function TagsBlock({ t, data }) {
  const {
    production_countries, genres, release_date, runtime
  } = data;

  if (
    (production_countries.length < 1) &&
    (genres.length < 1) &&
    !release_date &&
    !runtime
  ) return null;

  const getDuration = (mins) => {
    const h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? `0${m}` : m;
    return `${h}${t('movie_details.duration.hours')} ${m}${t('movie_details.duration.minutes')}`;
  };

  const getReleaseDate = (val) => val.split('-').reverse().join('.');

  const mapWithSemicolons = (list) => list.map((item, index) => {

    const value = (
      <span className="tag-value">
        {capitalize(item.name)}
      </span>
    );

    return (
      <Fragment key={`${index}_${item.name}`}>
        {index !== (list.length - 1)
          ? (
            <>
              {value}
              <span className={styles.tagSemicolon}>,</span>
            </>
          )
          : value}
      </Fragment>
    );
  });

  const tags = [];

  const fields = [
    {
      value: genres, icon: faVideo, func: mapWithSemicolons, cls: styles.tagGenres
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
    if (!isEmpty(value)) {
      tags.push({ icon, cls, text: func(value) });
    }
  });

  return (
    <div className={styles.tagsBlock}>
      {tags.map((item, index) => (
        <span
          key={`${index}_${item.text}`}
          className={cn(styles.tagItem, item.cls)}
        >
          <FontAwesomeIcon
            className={styles.tagIcon}
            icon={item.icon}
          />
          <span className={styles.tagText}>
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