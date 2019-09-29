import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import './App.scss'

import Sidebar from './components/Sidebar/Sidebar'
import Searchbar from './components/Searchbar/Searchbar'
import Search from './components/Search/Search'
import Popular from './components/Popular/Popular'
import Toprated from './components/Toprated/Toprated'
import Upcoming from './components/Upcoming/Upcoming'
import Genres from './components/Genres/Genres'

import './App.scss';

class App extends React.Component {

  render() {
    return (
      
        <Router>
        <Sidebar />
        <Searchbar />
          <Switch>
            <Route exact path="/Popular" component={Popular} />
            <Route exact path="/Toprated" component={Toprated} />
            <Route exact path="/Upcoming" component={Upcoming} /> 
            <Route exact path="/Search/:name" component={Search} />
            <Route exact path="/Genres/:name" component={Genres} />
          </Switch>
        </Router>
      
  );
}
}

export default App;
