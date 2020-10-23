import './CrewNamesList.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { CrewNames } from 'app_components/pages/movie-page/_blocks';
import { Row } from 'app_components/layout';

function CrewNamesList({ cls }) {
  const b = b_.with(cls);
  const cls_defaults = {
    cls_label: cn(b('label'), 'pr-1 col-12 col-md-auto p-0'),
    cls_value: cn(b('value'), 'col p-0')
  };

  const crewList = [
    {
      label: "Director",
      searchParams: { department: 'Directing', job: 'Director' }
    },
    {
      label: "Writing",
      searchParams: { department: 'Directing', job: 'Director' }
    },
    {
      label: "Director of Photography",
      searchParams: { department: 'Writing', job: ['Screenplay', 'Writer', 'Novel', 'Storyboard', 'Comic Book'] }
    },
    {
      label: "Original Music Composer",
      searchParams: { department: 'Sound', job: 'Original Music Composer' }
    }
  ];

  return (
    <Fragment>
      {crewList.map((item) =>
        <Row
          key={uuidv4()}
          cls={b()}
        >
          <CrewNames
            {...cls_defaults}
            label={item.label}
            searchParams={item.searchParams}
          />
        </Row>
      )}
    </Fragment>
  );
};

CrewNamesList.propTypes = {
  cls: PT.string.isRequired
};

export default CrewNamesList;