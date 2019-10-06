import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import './Movie.scss'

class Movie extends Component {

    state = {
        MOVIES: [],
        CAST: []
    }
    
    componentDidMount = async() => {
        //const id = this.props.location.state.movie;
        const id = this.props.match.params.name
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ MOVIES: DATA });

        const CAST_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=e8146f65b965e0a1cb0600c774f8a2a6`);
        const CAST_DATA = await CAST_RESULTS.json();
        this.setState({ CAST: CAST_DATA.cast })
        console.log(this.state.CAST)
    }

    render() {
        console.log(this.props.match.params.name)
        return (
            <div className="cast__main__container">
                {this.state.CAST && this.state.CAST.map((CAST, index) => {
                    if(index >= 6) return null;
                    return(
                       
                        <div className="cast__item" key={CAST.cast_id}>
                          <Link to={{
                              pathname: `/Person/${CAST.id}`      
                          }}>
                          <img
                                alt={CAST.name}
                                src={    
                                    `https://image.tmdb.org/t/p/original${CAST.profile_path}`                                  
                                } 
                           />
                           <p className="cast__title">{CAST.name}</p>
                          </Link>
                        </div>
                    )
                    })}
            </div>
        )
    }
}

export default Movie;