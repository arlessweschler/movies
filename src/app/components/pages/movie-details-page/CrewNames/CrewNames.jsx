import React, { Fragment, useContext } from 'react';
import PT from 'prop-types';

import CrewContext from 'app_contexts/CrewContext';

function CrewNames({ label, searchParams }) {
  const { getNames } = useContext(CrewContext);
  const names = getNames(searchParams);

  return (
    <Fragment>
      {names
        ? (
          <div className="mb-2">
            <span className="text-secondary">
              {label}:
            </span>

            <span className="p-1">
              {names}
            </span>
          </div>
        )
        : ''}
    </Fragment>
  );
};

CrewNames.propTypes = {
  label: PT.string.isRequired,
  searchParams: PT.shape({
    department: PT.string.isRequired,
    job: PT.string.isRequired
  }).isRequired
};

export default CrewNames;