import React, { Component } from 'react'
import {movie} from '../../services/services'

class Popular extends Component {
    
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
        )
    }
}

export default Popular;