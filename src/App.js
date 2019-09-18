import React from 'react';
import {movie} from './services/services'
import './App.scss';

class App extends React.Component {
  state = {
    MOVIES: []
  }

  movie = async() => {
    const MOVIE_RESULTS = await movie();
    this.setState({ MOVIES: MOVIE_RESULTS.results });
    console.log(this.state.MOVIES);
  }

  render() {
    return (
      <div>
        <button onClick={this.movie}>Click Me!</button>
      </div>
  );
}
}

export default App;
