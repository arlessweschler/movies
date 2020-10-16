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

export default {
  nullOrString: createNullOrCheck('string'),
  nullOrNumber: createNullOrCheck('number')
};