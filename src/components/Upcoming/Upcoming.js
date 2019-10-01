import React, { Component } from 'react'
import {upcoming_movie} from '../../services/services'

let count = 1;

class Upcoming extends Component {

    state = {
        MOVIES: [],
        total: ''
    }
    
   componentDidMount = async() => {
        const MOVIE_RESULTS = await upcoming_movie();
        this.setState({ 
            MOVIES: MOVIE_RESULTS.results,
            total: MOVIE_RESULTS.total_pages
        });
    }

    nextPage = async () => {
        if (count < this.state.total) {
        this.setState({
            MOVIES: []
         })
        count = count+1;
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&page=${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&page=${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    render() {
        return (
            <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {

                    return(
                        <div key={MOVIE.id}>
                            {MOVIE.title}
                        </div>
                    )
                })}
             <button onClick={this.backPage}>Back</button>
             <button onClick={this.nextPage}>Next</button>
            </div>
        )
    }
}

export default Upcoming;