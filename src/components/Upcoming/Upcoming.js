import React, { Component } from 'react'
import {upcoming_movie} from '../../services/services'

class Upcoming extends Component {

    state = {
        MOVIES: []
    }
    
    upcoming_movie = async() => {
        const MOVIE_RESULTS = await upcoming_movie();
        this.setState({ MOVIES: MOVIE_RESULTS.results });
        console.log(this.state.MOVIES);
    }

    render() {
        return (
            <div>
                 <button onClick={this.upcoming_movie}>Click Me!</button>
            </div>
        )
    }
}

export default Upcoming;