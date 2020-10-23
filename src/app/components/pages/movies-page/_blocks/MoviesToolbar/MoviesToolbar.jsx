import './MoviesToolbar.scss';

import React from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup } from "reactstrap";

import { TMDB_MOVIES_TYPES } from 'app_config';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';

function MoviesToolbar({
  handleFilter,
  activeFilter = DEFAULT_MOVIES_TYPE
}) {
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
          {filter.value}
        </Button>
      ))}
    </ButtonGroup>
  );
}

MoviesToolbar.propTypes = {
  handleFilter: PT.func.isRequired,
  activeFilter: PT.string
};

export default MoviesToolbar;