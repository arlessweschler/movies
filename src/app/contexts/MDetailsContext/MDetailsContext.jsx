import React, { Component, createContext } from 'react';
import PT from 'prop-types';

import { isEmpty } from 'app_services/UtilsService';

const MDetailsContext = createContext();

class MDetailsContextProvider extends Component {
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

    if (isEmpty(videos) || (typeof videos.find !== 'function')) {
      return null;
    }

    return videos.find((video) => {
      return (
        (video.site == searchParams.site) &&
        (video.type == searchParams.type)
      )
    });
  };

  render() {
    const { cls_base, movie, videos, credits, images, children } = this.props;

    return (
      <MDetailsContext.Provider value={{
        cls_base,
        movie,
        videos,
        credits,
        images,
        getCrewNames: this.getCrewNames,
        getTrailer: this.getTrailer
      }} >
        {children}
      </MDetailsContext.Provider>
    );
  }
}

MDetailsContextProvider.propTypes = {
  cls_base: PT.string.isRequired,

  movie: PT.shape({
    title: PT.string,
    production_countries: PT.array,
    genres: PT.array,
    release_date: PT.string,
    runtime: PT.number,
    vote_average: PT.number,
    overview: PT.string,
    poster_path: PT.string
  }).isRequired,

  credits: PT.shape({
    crew: PT.array,
    cast: PT.array
  }).isRequired,

  videos: PT.array.isRequired,

  images: PT.array.isRequired
};

export { MDetailsContextProvider };
export default MDetailsContext;