import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonGroup } from "reactstrap";

export default function MoviesTopFilter({ filters=[], handleFilter, activeFilter={} }) {
  return (
    <ButtonGroup className="movies-filter mb-3">
      {filters.map(filter => (
        <Button
          key={uuidv4()}
          color={activeFilter.key == filter.key ? "dark" : "light"}
          onClick={() => handleFilter(filter)}
        >
          {filter.value}
        </Button>
      ))}
    </ButtonGroup>
  );
}