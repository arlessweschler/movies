import './BackdropBlock.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';

import { TMDB_IMAGE_URL } from 'app_config'

const BackdropBlock = ({ data }) => {
  const { backdrop_path } = data;
  const bgImagePath = `${TMDB_IMAGE_URL.large}${backdrop_path}`;

  return (
    <div
      className="movie-backdrop w-100 h-100 position-fixed fixed-top"
      style={{
        backgroundSize: "cover",
        backgroundImage: backdrop_path ? `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0, .5)), url("${bgImagePath}")` : "none",
        backgroundColor: backdrop_path ? "none" : "black"
      }}
    />
  );
}

BackdropBlock.propTypes = {
  data: PT.shape({
    backdrop_path: PT.string
  }).isRequired
};

export default BackdropBlock;