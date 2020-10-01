const func = function (list) {
  let arr = [], item;

  for (let i = 0; i < list.length; i++) {
    item = list[i];
    const { path, routes } = item;

    if (path) arr.push(path);

    if (routes && routes.length > 0) {
      const subArr = func(routes);
      arr = arr.concat(subArr);
    }
  }

  return [...new Set(arr)];
};

export default func;