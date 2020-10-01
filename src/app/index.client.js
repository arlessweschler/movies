import "./index.scss";
import React from "react";
import { render, hydrate } from 'react-dom';

import ClientEntry from 'app_root/ClientEntry';

console.log('-- src/index.js');
console.log(`process.env: ${JSON.stringify(process.env, null, 4)}`);

const renderMethod = process.env.IS_SSR
  ? hydrate
  : render;

renderMethod(
  <ClientEntry />, document.getElementById('root')
);