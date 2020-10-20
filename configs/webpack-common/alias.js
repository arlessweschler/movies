const path = require('path');

module.exports = function ({ srcPath }) {
  let list = {
    app_root: 'app/root',
    app_config: 'app/config',
    app_components: 'app/components',
    app_containers: 'app/containers',
    app_contexts: 'app/contexts',
    app_hocs: 'app/hocs',
    app_services: 'app/services',
    app_history: 'app/services/HistoryService',

    app_assets: 'assets',
    app_data: 'data',

    app_redux: 'app/redux/',
    redux_store: 'app/redux/configureStore',
    redux_reducers: 'app/redux/rootReducer',
    redux_actions: 'app/redux/actions',

    server_api: 'server/api',
    server_config: 'server/express-app-config',
  };
  Object.keys(list).forEach(
    key => {
      list[key] = path.resolve(__dirname, `${srcPath}/${list[key]}`);
    }
  );
  return list;
};