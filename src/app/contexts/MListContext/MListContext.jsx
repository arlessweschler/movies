import React, { Component, createContext } from 'react';
import PT from 'prop-types';

const MListContext = createContext();

class MListContextProvider extends Component {
  render() {
    const { linkMovie, children } = this.props;

    return (
      <MListContext.Provider value={{
        linkMovie,
      }} >
        {children}
      </MListContext.Provider>
    );
  }
}

MListContextProvider.propTypes = {
  linkMovie: PT.func.isRequired
};

export { MListContextProvider };
export default MListContext;