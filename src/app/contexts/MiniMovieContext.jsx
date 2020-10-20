import React, { Component, createContext } from 'react';

import { isEmpty } from 'app_services/UtilsService';

const MiniMovieContext = createContext();

class MiniMovieContextProvider extends Component {
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
      <MiniMovieContext.Provider value={{
        genres: this.props.genres,
        linkMovie: this.props.linkMovie,
        printGenres: this.printGenres
      }} >
        {this.props.children}
      </MiniMovieContext.Provider>
    );
  }
}

export { MiniMovieContextProvider };
export default MiniMovieContext;