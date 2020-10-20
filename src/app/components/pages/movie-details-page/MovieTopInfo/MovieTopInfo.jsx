import 'app_components/pages/movie-details-page/MovieTopInfo/MovieTopInfo.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faVideo, faGlobe, faStar } from '@fortawesome/free-solid-svg-icons'

import { isNotEmpty } from 'app_services/UtilsService';

function MovieTopInfo({ movie }) {
  const { title, production_countries, genres, release_date, runtime, vote_average } = movie;

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

  const baseCls = 'movie-details-card';
  const getColClasses = (size) => `col-${size} col-sm-${size} col-md-${size} col-lg-${size} col-xl-${size}`;

  return (
    <Fragment>
      <div className="row">

        {/* col start */}
        <div className={`${getColClasses(9)} p-0`}>

          {/* title */}
          <h1 className={`${baseCls}__title`}>
            {title}
            <span className={`${baseCls}__year`}>
              ({moment(release_date).format('YYYY')})
              </span>
          </h1>

          {/* tags */}
          <div className={`${baseCls}__top-text`}>
            {tags.map((item, i) => (
              <Fragment key={uuidv4()}>
                <span className="item" >
                  <FontAwesomeIcon
                    className="item-icon"
                    icon={item.icon}
                  />
                  <span className="item-text">
                    {item.text}
                  </span>
                </span>
              </Fragment>
            ))}
          </div>
        </div>
        {/* col end */}

        {/* col start: rating */}
        <div className={`${getColClasses(3)} p-0`}>
          {vote_average && (
            <div className={`${baseCls}__rating`}>
              <FontAwesomeIcon
                className={`${baseCls}__rating-icon`}
                icon={faStar}
              />
              <span className={`${baseCls}__rating-text`}>
                {vote_average}
                <span className="out-of-10">/10</span>
              </span>
            </div>
          )}
        </div>
        {/* col end */}
      </div>
    </Fragment>
  );
};

MovieTopInfo.propTypes = {
  movie: PT.shape({
    title: PT.string,
    production_countries: PT.array,
    genres: PT.array,
    release_date: PT.string,
    runtime: PT.number,
    vote_average: PT.number
  }).isRequired,
};

export default MovieTopInfo;