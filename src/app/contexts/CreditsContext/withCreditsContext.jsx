import React from 'react';

import CreditsContext from './CreditsContext';

function withCreditsContext(Component) {
  return function WrapperComponent(props) {
    return (
      <CreditsContext.Consumer>
        {
          (context) => <Component {...props} context={context} />
        }
      </CreditsContext.Consumer>
    );
  };
}

export default withCreditsContext;