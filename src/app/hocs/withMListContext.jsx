import React from 'react';
import MListContext from 'app_contexts/MListContext';

function withMListContext(Component) {
  return function WrapperComponent(props) {
    return (
      <MListContext.Consumer>
        {context =>
          <Component {...props} context={context} />
        }
      </MListContext.Consumer>
    );
  };
}

export default withMListContext;