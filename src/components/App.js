import React from 'react';

import './styles.scss';

import Navigation from './Navigation';
import Tabs from './Tabs';

import { initGA, PageView } from './Shared/Tracking';

class App extends React.Component {
  componentDidMount() {
    initGA('G-GKMJ4KP806', { debug: false });
    PageView();
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
