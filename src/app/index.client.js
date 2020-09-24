import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";

import AppRoot from 'app_root/AppRoot';

console.log('-- src/index.js');
console.log(`process.env: ${JSON.stringify(process.env, null, 4)}`);

ReactDOM.render(
  <AppRoot />, document.querySelector("#root")
);