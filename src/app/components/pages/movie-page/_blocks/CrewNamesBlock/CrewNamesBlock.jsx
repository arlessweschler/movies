import React from 'react';
import PT from 'prop-types';

import { withMDetailsContext } from 'app_contexts';

function CrewNamesBlock(props) {
  const {
    cls_label = '', cls_value = '', label, searchParams, context
  } = props;
  const { getCrewNames } = context;

  const names = getCrewNames(searchParams);
  if (!names) return null;

  return (
    <>
      <div className={cls_label}>
        {label}
        {':'}
      </div>

      <div className={cls_value}>
        {names}
      </div>
    </>
  );
}

CrewNamesBlock.propTypes = {
  cls_label: PT.string,
  cls_value: PT.string,

  label: PT.string.isRequired,
  searchParams: PT.shape({
    department: PT.string.isRequired,
    job: PT.oneOfType([
      PT.array,
      PT.string
    ]).isRequired
  }).isRequired,

  context: PT.shape({
    getCrewNames: PT.func.isRequired
  }).isRequired
};

export default withMDetailsContext(CrewNamesBlock);