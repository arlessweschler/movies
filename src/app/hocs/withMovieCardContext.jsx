import React from 'react';
import MovieCardContext from 'app_contexts/MovieCardContext';

function withMovieCardContext(Component) {
  return function WrapperComponent(props) {
    return (
      <MovieCardContext.Consumer>
        {context =>
          <Component {...props} context={context} />
        }
      </MovieCardContext.Consumer>
    );
  };
}

export default withMovieCardContext;