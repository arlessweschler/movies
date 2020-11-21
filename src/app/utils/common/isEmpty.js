export default function isEmpty(value) {
  if (
    value && (
      (typeof value === 'string')
      || (typeof value === 'number')
    )
  ) {
    return false;
  } if (
    value &&
    (typeof value === 'object')
  ) {
    return !(Array.isArray(value)
      ? value.length
      : Object.keys(value).length);
  }

  return true;
}