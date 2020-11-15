import React from 'react';
import PT from 'prop-types';

import { withMDetailsContext } from '@/contexts';

function CrewNamesBlock(props) {
  const {
    labelCls = '', valueCls = '', label, searchParams, context
  } = props;
  const { getCrewNames } = context;

  const names = getCrewNames(searchParams);
  if (!names) return null;

  return (
    <>
      <div className={labelCls}>
        {label}
        {':'}
      </div>

      <div className={valueCls}>
        {names}
      </div>
    </>
  );
}

CrewNamesBlock.propTypes = {
  labelCls: PT.string,
  valueCls: PT.string,

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