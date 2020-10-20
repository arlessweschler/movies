import b_ from 'b_';

const Formatter = {
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

const b_col = Formatter.b_col;
const col_classes = Formatter.col_classes;

export default Formatter;

export {
  b_col,
  col_classes
}