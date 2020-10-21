import './Tags.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import b_ from 'b_';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faVideo, faGlobe } from '@fortawesome/free-solid-svg-icons'

import { isNotEmpty } from 'app_services/UtilsService';

function Tags({ cls, data }) {
  const { production_countries, genres, runtime } = data;

  const getDuration = mins => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? '0' + m : m;
    return `${h}h ${m}m`;
  };

  const mapWithSemicolons = (list) => list.map((item, i) => (
    <Fragment key={uuidv4()}>
      {i != (list.length - 1)
        ? `${item.name}, `
        : item.name}
    </Fragment>
  ));

  let tags = [];

  const fields = [
    { value: runtime, icon: faHistory, func: getDuration },
    { value: genres, icon: faVideo, func: mapWithSemicolons },
    { value: production_countries, icon: faGlobe, func: mapWithSemicolons },
  ];

  fields.forEach(({ value, icon, func }) => {
    if (isNotEmpty(value)) {
      tags.push({ icon, text: func(value) });
    }
  });

  const b = b_.with(cls);

  return (
    <div className={b()}>
      {tags.map((item) => (
        <span
          key={uuidv4()}
          className={b('item')}
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
};

Tags.propTypes = {
  cls: PT.string.isRequired,

  data: PT.shape({
    production_countries: PT.array,
    genres: PT.array,
    runtime: PT.number
  }).isRequired
};

export default Tags;