import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {popular_movie} from '../../services/services'


import './Popular.scss'

class Popular extends Component {

    state = {
        MOVIES: []
    }
    
    componentDidMount = async() => {
        const MOVIE_RESULTS = await popular_movie();
        this.setState({ MOVIES: MOVIE_RESULTS.results });
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
            </div>
        )
    }
}

export default Popular;