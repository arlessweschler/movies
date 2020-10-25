import React, { Component, createContext } from 'react';
import PT from 'prop-types';

import { isEmpty } from 'app_services/UtilsService';

const MListContext = createContext();

class MListContextProvider extends Component {
  printGenres = ({ ids, cls }) => {
    const { genres } = this.props;

    if (isEmpty(genres) || (typeof genres.find !== 'function')) {
      return null;
    }

    const text = ids
      .map(id => {
        const item = genres.find(item => item.id === id);
        return item
          ? item.name
          : null;
      })
      .join(', ');

    return (
      <div className={cls}>
        {text}
      </div>
    )
  };

  render() {
    const { genres, linkMovie, children } = this.props;

    return (
      <MListContext.Provider value={{
        genres,
        linkMovie,
        printGenres: this.printGenres
      }} >
        {children}
      </MListContext.Provider>
    );
  }
}

MListContextProvider.propTypes = {
  genres: PT.array.isRequired,
  linkMovie: PT.func.isRequired
};

export { MListContextProvider };
export default MListContext;