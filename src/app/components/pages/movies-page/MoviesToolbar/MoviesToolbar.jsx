import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup } from "reactstrap";

import { MOVIES_TYPES } from 'app_services/ApiMovies.service';
import { DEFAULT_MOVIES_TYPE } from 'app_redux/movies-saga/movies-saga.reducers';

export default function MoviesToolbar({
  handleFilter,
  activeFilter = DEFAULT_MOVIES_TYPE
}) {
  return (
    <ButtonGroup className="movies-filter mb-3">
      {MOVIES_TYPES.map(filter => (
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