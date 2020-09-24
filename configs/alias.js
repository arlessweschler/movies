const path = require('path');
const srcPath = path.resolve(__dirname, '../src');

module.exports = {
  // приложение
  "app_root": path.resolve(__dirname, `${srcPath}/app/root`),
  "app_components": path.resolve(__dirname, `${srcPath}/app/components`),
  "app_containers": path.resolve(__dirname, `${srcPath}/app/containers`),
  "async_routes": path.resolve(__dirname, `${srcPath}/app/root/async-routing/routes`),

  // ресурсы
  "app_assets": path.resolve(__dirname, `${srcPath}/assets`),
  "app_data": path.resolve(__dirname, `${srcPath}/data`),

  // redux 
  "redux_store": path.resolve(__dirname, `${srcPath}/app/redux/configureStore`),
  "redux_reducers": path.resolve(__dirname, `${srcPath}/app/redux/rootReducer`),
  "redux_actions": path.resolve(__dirname, `${srcPath}/app/redux/actions`)
};