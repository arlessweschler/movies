import b_ from 'b_';

import imageNotAvailable from 'app_assets/img/image_not_available.png';

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
  },

  b_col(size) {
    const B = b_.B({
      modSeparator: '-',
      modValueSeparator: '-'
    });

    return B('col', { [size]: true, sm: size, md: size, lg: size, xl: size })
  },

  col_classes(size) {
    return `col-sm-12 col-md-${size} col-lg-${size} col-xl-${size}`;
  }
}

const isEmpty = Utils.isEmpty;
const isNotEmpty = (value) => !Utils.isEmpty(value);
const b_col = Utils.b_col;
const col_classes = Utils.col_classes;

export default Utils;

export {
  imageNotAvailable,
  isEmpty,
  isNotEmpty,
  b_col,
  col_classes
}