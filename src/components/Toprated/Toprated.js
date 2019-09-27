import React, { Component } from 'react'
import {toprated_movie} from '../../services/services'

class Toprated extends Component {

    state = {
        MOVIES: []
    }
    
    componentDidMount = async() => {
        const MOVIE_RESULTS = await toprated_movie();
        this.setState({ MOVIES: MOVIE_RESULTS.results });
        console.log(this.state.MOVIES);
    }

    render() {
        return (
            <div className="main__container">
            {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {

                return(
                    <div>
                        {MOVIE.title}
                    </div>
                )
            })}
        </div>
        )
    }
}

export default Toprated;