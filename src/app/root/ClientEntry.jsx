import React from 'react';
import { hot } from 'react-hot-loader/root';

import AppRouter from 'app_root/routing/AppRouter';

const ClientEntry = () => {
  return <AppRouter />;
};

export default hot(ClientEntry);