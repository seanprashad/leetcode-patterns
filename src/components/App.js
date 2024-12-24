import React from 'react';

import './styles.scss';

import Navigation from './Navigation';
import Tabs from './Tabs';

import { initGA } from './Shared/Tracking';

class App extends React.Component {
  componentDidMount() {
    initGA('G-J7FBQPGZTW');
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Tabs />
      </div>
    );
  }
}

export default App;
