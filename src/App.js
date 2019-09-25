import React from 'react';
import Popular from './components/Popular/Popular'
import Toprated from './components/Toprated/Toprated'
import Upcoming from './components/Upcoming/Upcoming'

import './App.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        <Popular />
        <Toprated />
        <Upcoming />
      </div>
  );
}
}

export default App;
