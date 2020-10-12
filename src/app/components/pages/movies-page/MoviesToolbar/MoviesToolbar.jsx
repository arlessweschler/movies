import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup } from "reactstrap";

import { TMDB_MOVIES_TYPES } from 'app_config';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';

export default function MoviesToolbar({
  handleFilter,
  activeFilter = DEFAULT_MOVIES_TYPE
}) {
  return (
    <ButtonGroup className="movies-filter mb-3">
      {TMDB_MOVIES_TYPES.map(filter => (
        <Button
          key={uuidv4()}
          color={(activeFilter == filter.key) ? "dark" : "light"}
          onClick={() => handleFilter(filter.key)}
        >
          {filter.value}
        </Button>
      ))}
    </ButtonGroup>
  );
}