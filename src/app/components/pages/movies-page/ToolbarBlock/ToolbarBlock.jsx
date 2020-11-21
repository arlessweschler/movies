import './ToolbarBlock.scss';

import React from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { withTranslation } from 'react-i18next';
import cn from 'classnames';

import { TMDB_MOVIES_TYPES } from '@/constants/tmdb';
import withMoviesNav from '@/hocs/withMoviesNav';

function ToolbarBlock(props) {
  const {
    t,
    activeMoviesType,
    changeMoviesType
  } = props;

  return (
    <div
      className="movies-filter btn-group"
      role="group"
    >
      {TMDB_MOVIES_TYPES.map((moviesType) => {
        const isActive = (activeMoviesType === moviesType);
        return (
          <button
            key={uuidv4()}
            className={cn(moviesType, 'btn', {
              'active': isActive,
              'btn-dark': isActive,
              'btn-light': !isActive,
            })}
            onClick={() => changeMoviesType(moviesType)}
          >
            {t(`movie_types.${moviesType}`)}
          </button>
        );
      })}
    </div>
  );
}

ToolbarBlock.propTypes = {
  t: PT.func.isRequired,
  changeMoviesType: PT.func.isRequired,
  activeMoviesType: PT.string.isRequired
};

export default withTranslation()(withMoviesNav(ToolbarBlock));