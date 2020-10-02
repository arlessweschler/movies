import React from 'react';
import moment from 'moment';

export default function HomePage() {
  const dateAndTime = moment();
  return (
    <React.Fragment>
      <p>
        <b>Текущая дата: </b>{dateAndTime.format('DD.MM.YYYY')}
      </p>
      <p>
        <b>Текущее время: </b>{dateAndTime.format('hh:mm:ss')}
      </p>
      <div className="webpack-image" />
    </React.Fragment>
  );
}