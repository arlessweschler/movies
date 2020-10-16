import React, { Component, createContext } from 'react';

import { isEmpty } from 'app_services/UtilsService';

const GenresContext = createContext();

class GenresContextProvider extends Component {
  printGenres = ({ ids, cls }) => {
    const { value: genres } = this.props;

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
      <GenresContext.Provider value={{
        genres: this.props.value,
        printGenres: this.printGenres
      }} >
        {this.props.children}
      </GenresContext.Provider>
    );
  }
}

export { GenresContextProvider };
export default GenresContext;