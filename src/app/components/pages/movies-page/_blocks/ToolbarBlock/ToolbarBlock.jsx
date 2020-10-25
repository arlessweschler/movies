import './ToolbarBlock.scss';

import React from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup } from "reactstrap";
import { withTranslation } from 'react-i18next';

import { TMDB_MOVIES_TYPES } from 'app_config';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';

function ToolbarBlock(props) {
  const {
    handleFilter,
    activeFilter = DEFAULT_MOVIES_TYPE,
    t
  } = props;

  return (
    <ButtonGroup className="movies-filter">
      {TMDB_MOVIES_TYPES.map(filter => (
        <Button
          key={uuidv4()}
          color={(activeFilter == filter.key)
            ? 'dark'
            : 'light'}
          onClick={() => handleFilter(filter.key)}
        >
          {t(`movie_types.${filter.key}`)}
        </Button>
      ))}
    </ButtonGroup>
  );
}

ToolbarBlock.propTypes = {
  handleFilter: PT.func.isRequired,
  activeFilter: PT.string,

  t: PT.func.isRequired
};

export default withTranslation()(ToolbarBlock);