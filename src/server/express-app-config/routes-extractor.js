function extractRoutes(list) {
  let arr = [];

  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    const { path, routes } = item;

    if (path) arr.push(path);

    if (routes && routes.length > 0) {
      const subArr = extractRoutes(routes);
      arr = arr.concat(subArr);
    }
  }

  return [...new Set(arr)].filter((i) => i !== '*');
}

export default extractRoutes;