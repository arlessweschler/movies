import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import ClientRouter from 'app_routing/ClientRouter';

const renderMethod = process.env.IS_SSR
  ? hydrate
  : render;

renderMethod(
  <ClientRouter />,
  document.getElementById('root')
);

if (process.env.IS_DEV && module.hot) {
  module.hot.accept();
}