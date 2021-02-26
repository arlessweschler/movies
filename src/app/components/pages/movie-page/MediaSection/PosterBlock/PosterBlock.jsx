import styles from './PosterBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from '@/constants/tmdb';
import imageNotAvailable from '@/assets/img/image_not_available.png';

function PosterBlock({ cls, data }) {
  const { poster_path } = data;

  const classes = cn(styles.poster, cls, {
    [styles.noImage]: !poster_path
  });

  return (
    <img
      className={classes}
      src={
        poster_path
          ? `${TMDB_IMAGE_URL.medium}/${poster_path}`
          : imageNotAvailable
      }
    />
  );
}

PosterBlock.propTypes = {
  cls: PT.string,

  data: PT.shape({
    poster_path: PT.string
  }).isRequired
};

export default PosterBlock;