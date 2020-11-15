const path = require('path');

module.exports = (chunk) => {
  if (chunk.name) {
    return chunk.name;
  }

  /* eslint-disable no-underscore-dangle */
  return [...chunk._modules]
    .filter((i) => i.userRequest)
    .map((m) => path.relative(
      m.context,
      m.userRequest.substring(0, m.userRequest.lastIndexOf('.'))
    ))
    .join('_');
  /* eslint-enable no-underscore-dangle */
};