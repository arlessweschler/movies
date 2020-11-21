import React, { Component, createContext } from 'react';
import PT from 'prop-types';

import { asyncShape } from '@/types';
import { isEmpty } from '@/services/UtilsService';

const VideosContext = createContext();

class VideosContextProvider extends Component {
  searchVideos = (searchParams) => {
    const { videos } = this.props;
    const { data } = videos;

    if (isEmpty(data) || (typeof data.find !== 'function')) {
      return null;
    }

    return data.find((video) => (
      (video.site === searchParams.site) &&
      (video.type === searchParams.type)
    ));
  };

  render() {
    const { props, searchVideos } = this;
    const { children } = props;

    return (
      <VideosContext.Provider
        value={{ searchVideos }}
      >
        {children}
      </VideosContext.Provider>
    );
  }
}

VideosContextProvider.propTypes = {
  videos: asyncShape('array'),

  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};

export { VideosContextProvider };
export default VideosContext;