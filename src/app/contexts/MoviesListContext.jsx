import React, { Component, createContext } from 'react';
import PT from 'prop-types';

import { isEmpty } from 'app_services/UtilsService';

const MoviesListContext = createContext();

class MoviesListContextProvider extends Component {
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
    return (
      <MoviesListContext.Provider value={{
        genres: this.props.genres,
        linkMovie: this.props.linkMovie,
        printGenres: this.printGenres
      }} >
        {this.props.children}
      </MoviesListContext.Provider>
    );
  }
}

MoviesListContextProvider.propTypes = {
  genres: PT.array.isRequired,
  linkMovie: PT.func.isRequired
};

export { MoviesListContextProvider };
export default MoviesListContext;