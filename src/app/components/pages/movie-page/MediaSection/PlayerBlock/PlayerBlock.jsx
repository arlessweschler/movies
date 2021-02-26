import styles from './PlayerBlock.module.scss';

import React, { useState } from 'react';
import PT from 'prop-types';
import ReactPlayer from 'react-player/youtube';

import { ProgressBar } from '@/layout';

function PlayerBlock(props) {
  const { trailer } = props;
  const isLight = true;

  if (!trailer) return null;

  const [isLoading, setLoading] = useState(true);
  const host = 'https://www.youtube.com';

  return (
    <>
      {!isLight && isLoading && <ProgressBar />}

      <ReactPlayer
        width="100%"
        height="100%"
        className={styles.player}
        url={`${host}/embed/${trailer.key}`}
        playing={false}
        controls={true}
        onReady={() => setLoading(false)}
        // устанавливает превью изображение, при клике на которое загружается плеер
        light={isLight}
      />
    </>
  );
}

PlayerBlock.propTypes = {
  trailer: PT.shape({
    key: PT.string.isRequired
  })
};

export default PlayerBlock;