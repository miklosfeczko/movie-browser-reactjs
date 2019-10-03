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
import Movie from './components/Movie/Movie'
import Person from './components/Person/Person'


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
            <Route exact path="/Movie/:name" component={Movie} />
            <Route exact path="/Person/:name" component={Person} />
          </Switch>
        </Router>
      
  );
}
}

export default App;
