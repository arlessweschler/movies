const path = require('path');

module.exports = function ({ srcPath }) {
  let list = {
    app_root: 'app/root',
    app_components: 'app/components',
    app_containers: 'app/containers',

    app_assets: 'assets',
    app_data: 'data',

    redux_store: 'app/redux/configureStore',
    redux_reducers: 'app/redux/rootReducer',
    redux_actions: 'app/redux/actions',
  };
  Object.keys(list).forEach(
    key => {
      list[key] = path.resolve(__dirname, `${srcPath}/${list[key]}`);
    }
  );
  return list;
};