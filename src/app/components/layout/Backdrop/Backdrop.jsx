import './Backdrop.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from '@/settings/tmdb';

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
      className={cn('backdrop fixed-top',
        { 'backdrop--main': !backdrop_path })}
      style={style}
    />
  );
}

Backdrop.propTypes = {
  backdrop_path: PT.string
};

export default Backdrop;