import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'app_root/routing/routes';
import { configureStore } from 'redux_store';
import history from 'app_history';
import rootSaga  from 'app_redux/rootSaga';


let initialState = window.__PRELOADED_STATE__
  ? window.__PRELOADED_STATE__
  : {};

const store = configureStore(initialState);
store.runSaga(rootSaga);

const ClientRouter = () => {
  return (
    <Router history={history}>
      {renderRoutes(routes, { store })}
    </Router>
  );
};

export default ClientRouter;