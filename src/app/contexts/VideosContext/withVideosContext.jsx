import React from 'react';

import VideosContext from './VideosContext';

function withVideosContext(Component) {
  return function WrapperComponent(props) {
    return (
      <VideosContext.Consumer>
        {
          (context) => <Component {...props} context={context} />
        }
      </VideosContext.Consumer>
    );
  };
}

export default withVideosContext;