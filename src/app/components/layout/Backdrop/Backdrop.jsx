import styles from './Backdrop.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from '@/constants/tmdb';

function Backdrop(props) {
  const { backdrop_path = null } = props;

  const style = backdrop_path
    ? {
      backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${TMDB_IMAGE_URL.large}${backdrop_path}")`,
      animation: 'animateOpacity 0.5s ease'
    }
    : null;

  return (
    <div
      className={cn(styles.backdrop, {
        [styles.main]: !backdrop_path
      })}
      style={style}
    />
  );
}

Backdrop.propTypes = {
  backdrop_path: PT.string
};

export default Backdrop;