import 'app_components/pages/movie-details-page/MoviePlayer/MoviePlayer.scss';

import React from 'react';
import PT from 'prop-types';
import ReactPlayer from 'react-player/youtube'

import { isEmpty } from 'app_services/UtilsService';

function MoviePlayer({ videos, searchParams }) {
  const host = 'https://www.youtube.com';

  const trailer = videos.find((video) => {
    return (
      (video.site == searchParams.site) &&
      (video.type == searchParams.type)
    )
  });

  if (isEmpty(trailer)) return null;

  return (
    <ReactPlayer
      width="100%"
      height="100%"
      className='movie-player'
      url={`${host}/embed/${trailer.key}`}
      playing={false}
      controls={true}
      // устанавливает превью изображение, при клике на которое загружается плеер
      light
    />
  );
};

MoviePlayer.propTypes = {
  videos: PT.array.isRequired,
  searchParams: PT.shape({
    site: PT.string.isRequired,
    type: PT.string.isRequired
  }).isRequired
};

export default MoviePlayer;