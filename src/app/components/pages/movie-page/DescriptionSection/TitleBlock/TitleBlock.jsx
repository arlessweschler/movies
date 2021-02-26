import styles from './TitleBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';

function TitleBlock({ t, data }) {
  const { title, release_date, original_title } = data;

  return (
    <>
      <h1>
        {
          title &&
          <span className={styles.title}>
            {title}
          </span>
        }

        {
          release_date &&
          <span className={styles.year}>
            {`(${release_date.split('-')[0]})`}
          </span>
        }
      </h1>

      {original_title && (
        <div className="mb-2">
          <span className={styles.title}>
            {original_title}
          </span>

          <span className={styles.titleOriginal}>
            {`(${t('movie_details.original_title')})`}
          </span>
        </div>
      )}
    </>
  );
}

TitleBlock.propTypes = {
  t: PT.func.isRequired,

  data: PT.shape({
    title: PT.string,
    original_title: PT.string,
    release_date: PT.string
  }).isRequired,
};

export default withTranslation()(TitleBlock);