import React, { Component, createContext } from 'react';

import { isEmpty } from 'app_services/UtilsService';

const MovieCardContext = createContext();

class MovieCardContextProvider extends Component {
  getCrewNames = ({ department, job }) => {
    const { credits } = this.props;
    const { crew } = credits;

    if (isEmpty(credits) || isEmpty(crew)) {
      return null;
    }

    const persons = crew.filter(item =>
      (item.department === department) &&
      (item.job === job)
    );

    if (isEmpty(persons)) {
      return null;
    }

    return persons.map(
      (item, i) =>
        i != (persons.length - 1)
          ? `${item.name}, `
          : item.name
    );
  };

  getTrailer = (searchParams) => {
    const { videos } = this.props;

    return videos.find((video) => {
      return (
        (video.site == searchParams.site) &&
        (video.type == searchParams.type)
      )
    });
  };

  render() {
    const { movie, videos, credits } = this.props;

    return (
      <MovieCardContext.Provider value={{
        movie,
        videos,
        credits,
        getCrewNames: this.getCrewNames,
        getTrailer: this.getTrailer
      }} >
        {this.props.children}
      </MovieCardContext.Provider>
    );
  }
}

export { MovieCardContextProvider };
export default MovieCardContext;