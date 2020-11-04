import PT from 'prop-types';

function createNullOrCheck(additionalType) {
  return function (props, key) {
    let value = props[key];
    return (
      (value === null) ||
      (typeof value === additionalType)
    )
      ? null
      : new Error(`Property "${key}" value type expected to be null or ${additionalType}, but got type "${typeof value}"`);
  }
}

function asyncShape(dataType) {
  return PT.shape({
    isLoading: PT.bool.isRequired,
    error: createNullOrCheck('string'),
    data: PT[dataType].isRequired
  }).isRequired;
}


export default {
  asyncShape,
  nullOrString: createNullOrCheck('string'),
  nullOrNumber: createNullOrCheck('number')
};