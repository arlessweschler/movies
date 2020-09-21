import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import AppRouter from 'app_root/AppRouter';
const configureStore = require('redux_store').configureStore;

console.log('src/app/AppRoot.jsx');

const AppRoot = () => {
  return (
    <Provider store={configureStore()}>
      <AppRouter />
    </Provider>
  );
};

export default hot(AppRoot);