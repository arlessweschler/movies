import './index.scss';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import ClientEntry from 'app_root/ClientEntry';

console.log('-- src/index.js');
console.log(`process.env: ${JSON.stringify(process.env, null, 4)}`);

const renderMethod = process.env.IS_SSR
  ? hydrate
  : render;

renderMethod(
  <AppContainer>
    <ClientEntry />
  </AppContainer>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }
}