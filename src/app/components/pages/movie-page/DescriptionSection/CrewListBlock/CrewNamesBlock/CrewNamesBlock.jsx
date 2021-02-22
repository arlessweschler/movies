import React from 'react';
import PT from 'prop-types';

import { withCreditsContext } from '@/contexts';

function CrewNamesBlock(props) {
  const {
    labelCls = '', valueCls = '', label, searchParams, context
  } = props;
  const { searchCrewNames } = context;

  const names = searchCrewNames(searchParams);
  if (!names) return null;

  return (
    <>
      <div className={labelCls}>
        {label}
        :
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
    searchCrewNames: PT.func.isRequired
  }).isRequired
};

export default withCreditsContext(CrewNamesBlock);