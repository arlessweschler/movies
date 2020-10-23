import './Title.scss';

import React from 'react';
import PT from 'prop-types';
import moment from 'moment';
import b_ from 'b_';

function Title({ cls, data }) {
  const { title, release_date } = data;
  const b = b_.with(cls);

  return (
    <h1>
      <span className={b('title')}>
        {title}
      </span>
      <span className={b('year')}>
        ({moment(release_date).format('YYYY')})
      </span>
    </h1>
  );
};

Title.propTypes = {
  cls: PT.string.isRequired,

  data: PT.shape({
    title: PT.string,
    release_date: PT.string
  }).isRequired
};

export default Title;