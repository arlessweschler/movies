import './CrewListBlock.scss';

import React from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import b_ from 'b_';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { CrewNamesBlock } from 'app_components/pages/movie-page/_blocks';
import { Row } from 'app_components/layout';

function CrewListBlock({ cls, t }) {
  const b = b_.with(cls);
  const cls_defaults = {
    cls_label: cn(b('label'), 'pr-1 col-12 col-md-auto p-0'),
    cls_value: cn(b('value'), 'col p-0')
  };

  const crewList = [
    {
      label: t('movie_details.crew.director'),
      searchParams: { department: 'Directing', job: 'Director' }
    },
    {
      label: t('movie_details.crew.writing'),
      searchParams: { department: 'Directing', job: 'Director' }
    },
    {
      label: t('movie_details.crew.director_of_photography'),
      searchParams: { department: 'Writing', job: ['Screenplay', 'Writer', 'Novel', 'Storyboard', 'Comic Book'] }
    },
    {
      label: t('movie_details.crew.original_music_composer'),
      searchParams: { department: 'Sound', job: 'Original Music Composer' }
    }
  ];

  return (
    <>
      {crewList.map((item) => (
        <Row
          key={uuidv4()}
          cls={b()}
        >
          <CrewNamesBlock
            {...cls_defaults}
            label={item.label}
            searchParams={item.searchParams}
          />
        </Row>
      ))}
    </>
  );
}

CrewListBlock.propTypes = {
  cls: PT.string.isRequired,
  t: PT.func.isRequired
};

export default withTranslation()(CrewListBlock);