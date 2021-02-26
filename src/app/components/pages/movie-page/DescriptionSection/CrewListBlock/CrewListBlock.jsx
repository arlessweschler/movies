import styles from './CrewListBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import { withTranslation } from 'react-i18next';
import cn from 'classnames';

import { Row } from '@/markup';
import CrewNamesBlock from './CrewNamesBlock';

function CrewListBlock({ t }) {

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
        <Row key={`${index}_${item.label}`}>
          <CrewNamesBlock
            labelCls={cn(styles.label, 'pr-1 col-12 col-md-auto p-0')}
            valueCls={cn(styles.value, 'col p-0')}
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