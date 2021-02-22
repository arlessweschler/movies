import './CrewListBlock.scss';

import React from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import b_ from 'b_';
import cn from 'classnames';

import { Row } from '@/markup';
import CrewNamesBlock from './CrewNamesBlock';

function CrewListBlock({ t }) {
  const b = b_.with('movie-details-crew');

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
      {crewList.map((item, index) => (
        <Row
          key={`${index}_${item.label}`}
          cls={b()}
        >
          <CrewNamesBlock
            labelCls={cn(b('label'), 'pr-1 col-12 col-md-auto p-0')}
            valueCls={cn(b('value'), 'col p-0')}
            label={item.label}
            searchParams={item.searchParams}
          />
        </Row>
      ))}
    </>
  );
}

CrewListBlock.propTypes = {
  t: PT.func.isRequired
};

export default withTranslation()(CrewListBlock);