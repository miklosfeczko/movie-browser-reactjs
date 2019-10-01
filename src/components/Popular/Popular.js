import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {popular_movie} from '../../services/services'


import './Popular.scss'

let count = 1;

class Popular extends Component {

    state = {
        MOVIES: []
    }
    
    componentDidMount = async() => {
        const MOVIE_RESULTS = await popular_movie();
        this.setState({ MOVIES: MOVIE_RESULTS.results });
    }

    nextPage = async () => {
        console.log(this.state.page)
        this.setState({
            MOVIES: []
         })
        count = count+1;
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&page=${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        console.log(this.state.page)
        console.log(count)
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&page=${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
        console.log(this.state.page)
    }

    render() {
        return (
            <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {

                    return(
                        <div key={MOVIE.id}>
                            <Link to={{
                                pathname: `/Movie/${MOVIE.id}`,
                                state: { movie: MOVIE.id }
                            }}>
                                {MOVIE.title}
                            </Link>
                        </div>
                    )
                })}
             <button onClick={this.backPage}>Back</button>
             <button onClick={this.nextPage}>Next</button>
            </div>
        )
    }
}

export default Popular;