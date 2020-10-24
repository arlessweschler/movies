import './ListBlock.scss';

import React from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { CardBlock } from 'app_components/pages/movies-page/_blocks';

function ListBlock(props) {
  return (
    <div className="d-flex flex-wrap justify-content-between mt-3">
      {props.movies.map((movie) =>
        <CardBlock
          key={uuidv4()}
          movie={movie}
        />)}
    </div>
  );
};

ListBlock.propTypes = {
  movies: PT.array
};

export default ListBlock;