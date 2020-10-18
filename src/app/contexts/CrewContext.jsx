import React, { Component, createContext } from 'react';

import { isEmpty } from 'app_services/UtilsService';

const CrewContext = createContext();

class CrewContextProvider extends Component {
  getNames = ({ department, job }) => {
    const { value: credits } = this.props;
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

  render() {
    return (
      <CrewContext.Provider value={{
        credits: this.props.value,
        getNames: this.getNames
      }} >
        {this.props.children}
      </CrewContext.Provider>
    );
  }
}

export { CrewContextProvider };
export default CrewContext;