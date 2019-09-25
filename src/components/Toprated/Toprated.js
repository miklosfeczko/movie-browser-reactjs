import React, { Component } from 'react'
import {toprated_movie} from '../../services/services'

class Toprated extends Component {

    state = {
        MOVIES: []
    }
    
    toprated_movie = async() => {
        const MOVIE_RESULTS = await toprated_movie();
        this.setState({ MOVIES: MOVIE_RESULTS.results });
        console.log(this.state.MOVIES);
    }

    render() {
        return (
            <div>
                 <button onClick={this.toprated_movie}>Click Me!</button>
            </div>
        )
    }
}

export default Toprated;