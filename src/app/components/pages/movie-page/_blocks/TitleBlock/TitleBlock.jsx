import './TitleBlock.scss';

import React from 'react';
import PT from 'prop-types';
import moment from 'moment';
import b_ from 'b_';
import cn from 'classnames';

import { withTranslation } from 'react-i18next';

function TitleBlock({ t, cls, data }) {
  const { title, release_date, original_title } = data;
  const b = b_.with(cls);

  return (
    <>
      <h1>
        {
          title &&
          <span className={b('title')}>
            {title}
          </span>
        }

        {
          release_date &&
          <span className={b('year')}>
            {moment(release_date).format('YYYY')}
          </span>
        }
      </h1>

      {original_title && (
        <div className={cn(b('original'), 'mb-2')}>
          <span className={b('title')}>
            {original_title}
          </span>
          <span className="ml-1">
            {t('movie_details.original_title')}
          </span>
        </div>
      )}
    </>
  );
}

TitleBlock.propTypes = {
  t: PT.func.isRequired,
  cls: PT.string.isRequired,

  data: PT.shape({
    title: PT.string,
    original_title: PT.string,
    release_date: PT.string
  }).isRequired,
};

export default withTranslation()(TitleBlock);