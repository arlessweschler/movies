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

    const isJobsArray = Array.isArray(job);

    const persons = [...new Set(crew.filter(item => {
      return (
        (item.department === department) &&
        (isJobsArray
          ? job.includes(item.job)
          : (item.job === job)
        )
      );
    }
    ).map(p => p.name))];

    if (isEmpty(persons)) {
      return null;
    }

    return persons.map(
      (person, i) =>
        i != (persons.length - 1)
          ? `${person}, `
          : person
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