import React, { Fragment } from 'react';
import PT from 'prop-types';

import { withMovieCardContext } from 'app_hocs';

function CrewNames(props) {
  const { label, searchParams, context } = props;
  const { getCrewNames } = context;

  const names = getCrewNames(searchParams);

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
  }).isRequired,

  context: PT.shape({
    getCrewNames: PT.func.isRequired
  }).isRequired
};

export default withMovieCardContext(CrewNames);