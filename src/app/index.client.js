import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";

import ClientEntry from 'app_root/ClientEntry';

console.log('-- src/index.js');
console.log(`process.env: ${JSON.stringify(process.env, null, 4)}`);

ReactDOM.render(
  <ClientEntry />, document.querySelector("#root")
);