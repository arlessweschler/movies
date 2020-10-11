import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'app_root/routing/routes';
import history from 'app_history';
import store from 'redux_store';
import rootSaga from 'app_redux/rootSaga';

store.runSaga(rootSaga);

const ClientRouter = () => {
  return (
    <Router history={history}>
      {renderRoutes(routes, { store })}
    </Router>
  );
};

export default ClientRouter;