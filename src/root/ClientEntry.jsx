import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';


class ClientEntry extends Component {
  render() {
    console.log('src/root/ClientEntry.jsx, render()');

    return (
      <div>
        <p>ClientEntry</p>
        <div className="webpack-image"></div>
      </div>
    );
  }
}

export default hot(ClientEntry);