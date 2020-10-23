import './PosterBlock.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { TMDB_IMAGE_URL } from 'app_config';
import { imageNotAvailable } from 'app_services/UtilsService';

function PosterBlock({ cls, data }) {
  const { poster_path } = data;

  const classes = cn(cls, {
    'no-image': !poster_path
  });

  return (
    <img
      className={classes}
      src={poster_path
        ? `${TMDB_IMAGE_URL.large}/${poster_path}`
        : imageNotAvailable
      }
    />
  );
};

PosterBlock.propTypes = {
  cls: PT.string,

  data: PT.shape({
    poster_path: PT.string
  }).isRequired
};

export default PosterBlock;