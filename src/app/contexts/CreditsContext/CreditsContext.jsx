import React, { Component, createContext } from 'react';
import PT from 'prop-types';

import { isEmpty } from '@/utils/common';

const CreditsContext = createContext();

class CreditsContextProvider extends Component {
  searchCrewNames = ({ department, job }) => {
    const { credits } = this.props;
    const { data } = credits || {};
    const { crew } = data || {};

    if (isEmpty(data) || isEmpty(crew)) return null;

    const isJobsArray = Array.isArray(job);

    const persons = [...new Set(crew.filter((item) => (
      (item.department === department) &&
      (isJobsArray
        ? job.includes(item.job)
        : (item.job === job)
      )
    )).map((p) => p.name))];

    if (isEmpty(persons)) return null;

    return persons.map(
      (person, i) => (i !== (persons.length - 1)
        ? `${person}, `
        : person)
    );
  };

  render() {
    const { credits, children } = this.props;

    return (
      <CreditsContext.Provider
        value={{
          credits: credits.data,
          searchCrewNames: this.searchCrewNames
        }}
      >
        {children}
      </CreditsContext.Provider>
    );
  }
}

CreditsContextProvider.propTypes = {
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired,

  credits: PT.shape({
    data: PT.shape({
      crew: PT.array,
      cast: PT.array
    }).isRequired
  }).isRequired
};

export { CreditsContextProvider };
export default CreditsContext;