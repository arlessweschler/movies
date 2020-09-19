import React, { Component } from 'react';


class ClientEntry extends Component {
  render() {
    console.log('src/root/ClientEntry.jsx, render()');

    return (
      <div>
        <p>ClientEntry.jsx</p>
        <div className="webpack-image"></div>
      </div>
    );
  }
}

export default ClientEntry;