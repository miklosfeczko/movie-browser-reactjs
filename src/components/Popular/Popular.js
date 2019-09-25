import React, { Component } from 'react'
import {popular_movie} from '../../services/services'

class Popular extends Component {

    state = {
        MOVIES: []
    }
    
    popular_movie = async() => {
        const MOVIE_RESULTS = await popular_movie();
        this.setState({ MOVIES: MOVIE_RESULTS.results });
        console.log(this.state.MOVIES);
    }

    render() {
        return (
            <div>
                 <button onClick={this.popular_movie}>Click Me!</button>
            </div>
        )
    }
}

export default Popular;