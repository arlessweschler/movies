import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import ClientRouter from '@/routing/ClientRouter';

const renderMethod = (process.env.RENDERING === 'server')
  ? hydrate
  : render;

renderMethod(
  <AppContainer>
    <ClientRouter />
  </AppContainer>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}