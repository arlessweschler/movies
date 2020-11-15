import './ToolbarBlock.scss';

import React from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup } from 'reactstrap';
import { withTranslation } from 'react-i18next';

import { TMDB_MOVIES_TYPES } from 'app_settings_tmdb';
import withMoviesNav from 'app_hocs/withMoviesNav';

function ToolbarBlock(props) {
  const {
    t,
    activeMoviesType,
    changeMoviesType
  } = props;

  return (
    <ButtonGroup className="movies-filter">
      {TMDB_MOVIES_TYPES.map((moviesType) => (
        <Button
          key={uuidv4()}
          color={(activeMoviesType === moviesType)
            ? 'dark'
            : 'light'}
          onClick={() => changeMoviesType(moviesType)}
        >
          {t(`movie_types.${moviesType}`)}
        </Button>
      ))}
    </ButtonGroup>
  );
}

ToolbarBlock.propTypes = {
  t: PT.func.isRequired,
  changeMoviesType: PT.func.isRequired,
  activeMoviesType: PT.string.isRequired
};

export default withTranslation()(withMoviesNav(ToolbarBlock));