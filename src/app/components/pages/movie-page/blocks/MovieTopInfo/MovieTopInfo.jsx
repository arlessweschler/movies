import './MovieTopInfo.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faVideo, faGlobe, faStar } from '@fortawesome/free-solid-svg-icons'
import b_ from 'b_';
import cn from 'classnames';

import { isNotEmpty } from 'app_services/UtilsService';
import { b_col } from 'app_services/FormatterService';
import { withMovieCardContext } from 'app_hocs';

function MovieTopInfo({ context }) {
  const { movie } = context;
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

  const b = b_.with('movie-details');
  const b_top = b_.with('movie-details-top');
  const b_rate = b_.with('movie-details-rating');

  return (
    <Fragment>
      <div className="row">

        {/* col start */}
        <div className={cn(b_col(9), 'p-0')}>

          {/* title */}
          <h1>
            {title}
            <span className={b('year')}>
              ({moment(release_date).format('YYYY')})
              </span>
          </h1>

          {/* tags */}
          <div className={b_top()}>
            {tags.map((item) => (
              <Fragment key={uuidv4()}>
                <span className={b_top('item')} >
                  <FontAwesomeIcon
                    className={b_top('icon')}
                    icon={item.icon}
                  />
                  <span className={b_top('text')}>
                    {item.text}
                  </span>
                </span>
              </Fragment>
            ))}
          </div>
        </div>
        {/* col end */}

        {/* col start: rating */}
        <div className={cn(b_col(3), 'p-0')}>
          {vote_average
            ? (<div className={b_rate()}>
              <FontAwesomeIcon
                className={b_rate('icon')}
                icon={faStar}
              />
              {vote_average}
              <span className={b_rate('scale')}>
                /10
              </span>
            </div>)
            : ''}
        </div>
        {/* col end */}
      </div>
    </Fragment>
  );
};

MovieTopInfo.propTypes = {
  context: PT.shape({
    movie: PT.shape({
      title: PT.string,
      production_countries: PT.array,
      genres: PT.array,
      release_date: PT.string,
      runtime: PT.number,
      vote_average: PT.number
    }).isRequired
  }).isRequired
};

export default withMovieCardContext(MovieTopInfo);