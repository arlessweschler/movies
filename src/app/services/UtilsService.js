const Utils = {
  isEmpty(value) {
    if (
      value && (
        (typeof value === 'string') ||
        (typeof value === 'number')
      )
    ) {
      return false;

    } else if (
      value &&
      (typeof value === 'object')
    ) {
      return Array.isArray(value)
        ? !Boolean(value.length)
        : !Boolean(Object.keys(value).length);
    }

    return true;
  }
}

const isEmpty = Utils.isEmpty;
const isNotEmpty = (value) => !Utils.isEmpty(value);

export default Utils;

export {
  isEmpty,
  isNotEmpty
}