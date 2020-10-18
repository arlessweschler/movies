import React from 'react';
import PT from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

function MovieField({ label, value, mapWithSemicolons = false }) {

  return (
    <div className="mb-2">
      <span className="text-secondary">
        {label}:
      </span>

      <span className="p-1">
        {
          !mapWithSemicolons
            ? value
            : value.map((item, i) => (
              <span
                key={uuidv4()}
                className="pr-1"
              >
                {i != (value.length - 1)
                  ? `${item.name},`
                  : item.name}
              </span>
            ))
        }
      </span>
    </div>
  );
};

MovieField.propTypes = {
  label: PT.string.isRequired,
  value: PT.oneOfType([
    PT.string,
    PT.number,
    PT.array
  ]).isRequired,
};

export default MovieField;