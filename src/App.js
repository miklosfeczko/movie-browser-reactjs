import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import './App.scss'

import Sidebar from './components/Sidebar/Sidebar'
import Popular from './components/Popular/Popular'
import Toprated from './components/Toprated/Toprated'
import Upcoming from './components/Upcoming/Upcoming'

import './App.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
        <Sidebar />
          <Switch>
            <Route exact path="/Popular" component={Popular} />
            <Route exact path="/Toprated" component={Toprated} />
            <Route exact path="/Upcoming" component={Upcoming} />
        </Switch>
        </Router>
      </div>
  );
}
}

export default App;
