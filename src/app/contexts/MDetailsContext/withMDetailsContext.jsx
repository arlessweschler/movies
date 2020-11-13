import React from 'react';
import { MDetailsContext } from 'app_contexts';

function withMDetailsContext(Component) {
  return function WrapperComponent(props) {
    return (
      <MDetailsContext.Consumer>
        {
          (context) => <Component {...props} context={context} />
        }
      </MDetailsContext.Consumer>
    );
  };
}

export default withMDetailsContext;