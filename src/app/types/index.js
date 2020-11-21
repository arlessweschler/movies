import PT from 'prop-types';

function createError(key, value, expected) {
  return new Error(`Property "${key}" value type expected to be null or ${expected}, but got type "${typeof value}"`);
}

function nullOrNumber(props, key) {
  const value = props[key];

  return ((value === null) || (typeof value === 'number'))
    ? null
    : createError(key, value, 'number');
}

function nullOrString(props, key) {
  const value = props[key];

  return ((value === null) || (typeof value === 'string'))
    ? null
    : createError(key, value, 'string');
}

function asyncShape(dataType) {
  return PT.shape({
    isLoading: PT.bool.isRequired,
    error: nullOrString,
    data: PT[dataType].isRequired
  }).isRequired;
}

export {
  asyncShape,
  nullOrString,
  nullOrNumber
};