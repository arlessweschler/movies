import './PlayerBlock.scss';

import React, { Fragment, useState } from 'react';
import PT from 'prop-types';
import ReactPlayer from 'react-player/youtube'

import { isEmpty } from 'app_services/UtilsService';
import { ProgressBar } from 'app_components/layout';
import { withMDetailsContext } from 'app_contexts';

function PlayerBlock(props) {
  const { searchParams, context } = props;
  const { getTrailer } = context;
  const isLight = true;

  const trailer = getTrailer(searchParams);
  if (isEmpty(trailer)) return null;

  const [isLoading, setLoading] = useState(true);
  const host = 'https://www.youtube.com';

  return (
    <Fragment>
      {!isLight && isLoading && <ProgressBar />}
      <ReactPlayer
        width="100%"
        height="100%"
        className='movie-player'
        url={`${host}/embed/${trailer.key}`}
        playing={false}
        controls={true}
        onReady={() => setLoading(false)}
        // устанавливает превью изображение, при клике на которое загружается плеер
        light={isLight}
      />
    </Fragment>
  );
};

PlayerBlock.propTypes = {
  searchParams: PT.shape({
    site: PT.string.isRequired,
    type: PT.string.isRequired
  }).isRequired,

  context: PT.shape({
    getTrailer: PT.func.isRequired
  }).isRequired
};

export default withMDetailsContext(PlayerBlock);