import React from 'react';
import moment from 'moment';

export default function DashboardPage() {
  return (
    <div>
      <h2>DashboardPage content</h2>
      <b>Current date and time is: </b>{moment().format('DD.MM.YYYY hh:mm:ss')}
    </div>
  );
}