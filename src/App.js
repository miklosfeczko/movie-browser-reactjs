import React from 'react';
import Popular from './components/Popular/Popular'
import Toprated from './components/Toprated/Toprated'

import './App.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        <Popular />
        <Toprated />
      </div>
  );
}
}

export default App;
