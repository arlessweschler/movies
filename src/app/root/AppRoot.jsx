import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { configureStore } from 'redux_store';

// import AppBrowserRouter from 'app_root/browser-routing/AppBrowserRouter';
import AppAsyncRouter from 'app_root/async-routing/AppAsyncRouter';

console.log('src/app/AppRoot.jsx');

const AppRoot = () => {
  return (
    <Provider store={configureStore()}>
      {/* <AppBrowserRouter /> */}
      <AppAsyncRouter />
    </Provider>
  );
};

export default hot(AppRoot);