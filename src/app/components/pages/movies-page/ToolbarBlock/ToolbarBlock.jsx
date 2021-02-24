import styles from './ToolbarBlock.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import { TMDB_MOVIES_TYPES } from '@/constants/tmdb';
import withMoviesNav from '@/hocs/withMoviesNav';
import FilterButton from './FilterButton';

function ToolbarBlock(props) {
  const {
    t,
    activeMoviesType,
    changeMoviesType
  } = props;

  return (
    <div className="col-12 col-lg-auto p-0 pr-lg-2">
      <Helmet>
        <title>
          {t(`movie_types.${activeMoviesType}`)}
          {' | Movies'}
        </title>
      </Helmet>

      <div
        className={cn(styles.group, 'btn-group')}
        role="group"
        data-test="movies-filter"
      >
        {TMDB_MOVIES_TYPES.map(
          (item, index) => (
            <FilterButton
              key={index}
              isActive={activeMoviesType === item}
              value={item}
              text={t(`movie_types.${item}`)}
              handler={changeMoviesType}
            />
          )
        )}
      </div>
    </div>
  );
}

ToolbarBlock.propTypes = {
  t: PT.func.isRequired,
  changeMoviesType: PT.func.isRequired,
  activeMoviesType: PT.string.isRequired
};

export default withTranslation()(withMoviesNav(ToolbarBlock));