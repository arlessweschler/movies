const path = require('path');

module.exports = function (chunk) {
  if (chunk.name) {
    return chunk.name;
  }

  return [...chunk._modules]
    .filter((i) => i.userRequest)
    .map(m =>
      path.relative(
        m.context,
        m.userRequest.substring(0, m.userRequest.lastIndexOf('.'))
      )
    )
    .join('_');
};