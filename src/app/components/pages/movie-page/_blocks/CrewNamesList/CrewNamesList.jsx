import './CrewNamesList.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { CrewNames } from 'app_components/pages/movie-page/_blocks';
import { Row } from 'app_components/layout';

function CrewNamesList({ cls }) {
  const b = b_.with(cls);
  const cls_defaults = {
    // cls_label: cn(b('label'), 'p-0'),
    cls_label: cn(b('label'), 'pr-1 col-12 col-md-auto p-0'),
    // cls_value: b('value')
    cls_value: cn(b('value'), 'col p-0')
  };

  return (
    <Fragment>
      <Row cls={b()}>
        <CrewNames
          {...cls_defaults}
          label="Director"
          searchParams={{ department: 'Directing', job: 'Director' }}
        />
      </Row>

      <Row cls={b()}>
        <CrewNames
          {...cls_defaults}
          label="Writing"
          searchParams={{ department: 'Writing', job: ['Screenplay', 'Writer', 'Novel', 'Storyboard', 'Comic Book'] }}
        />
      </Row>

      <Row cls={b()}>
        <CrewNames
          {...cls_defaults}
          label="Director of Photography"
          searchParams={{ department: 'Camera', job: 'Director of Photography' }}
        />
      </Row>

      <Row cls={b()}>
        <CrewNames
          {...cls_defaults}
          label="Original Music Composer"
          searchParams={{ department: 'Sound', job: 'Original Music Composer' }}
        />
      </Row>
    </Fragment>
  );
};

CrewNamesList.propTypes = {
  cls: PT.string.isRequired
};

export default CrewNamesList;