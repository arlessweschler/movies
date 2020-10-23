import './Backdrop.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';

import { TMDB_IMAGE_URL } from 'app_config'

const Backdrop = ({ data }) => {
  const { backdrop_path } = data;
  const bgImagePath = `${TMDB_IMAGE_URL.large}${backdrop_path}`;

  return (
    <Fragment>
      <div
        className="movie-backdrop w-100 h-100 position-fixed fixed-top"
        style={{
          backgroundSize: "cover",
          backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${bgImagePath}")`
        }}
      />
    </Fragment>
  );
}

Backdrop.propTypes = {
  data: PT.shape({
    backdrop_path: PT.string
  }).isRequired
};

export default Backdrop;