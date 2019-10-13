import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Fade } from "react-reveal";
import Box from '@material-ui/core/Box';
import {StyledRating} from '../../utils/StyledRating'
import placeholderImg from "../../placeholder.jpg";
import placeholderCast from '../../placeholderRiddle.jpg'

import './Movie.scss'

class Movie extends Component {

    state = {
        MOVIE: [],
        CAST: [],
        genres: []
    }
    
    componentDidMount = async() => {
        const id = this.props.match.params.name
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIE: DATA,
            genres: DATA.genres
         });

        const CAST_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=e8146f65b965e0a1cb0600c774f8a2a6`);
        const CAST_DATA = await CAST_RESULTS.json();
        this.setState({ CAST: CAST_DATA.cast })
    }

    render() {
        console.log(this.state.MOVIE)
        console.log(this.state.CAST)
    
        return (
            <div className="wrapper">
            <Fade>
            <div className="movie__wrapper">
                
                    <div className="image__wrapper">
                        <img
                        alt={this.state.MOVIE.title} 
                        src={
                        this.state.MOVIE.poster_path 
                        ? `https://image.tmdb.org/t/p/original${this.state.MOVIE.poster_path}` 
                        : placeholderImg
                        }/>
                    </div>
                
                <div className="movie__details">
                    <h1 className="header__wrapper">
                    <p>{this.state.MOVIE.title}</p>
                    </h1>
               
                    <h3>{this.state.MOVIE.tagline}</h3>
                    <Box style={{textAlign: 'left', marginBottom: '2rem'}}>
                                <StyledRating name="half-rating" value={this.state.MOVIE.vote_average/2} precision={0.25} readOnly/>
                                <span style={{display: 'inline-block', marginLeft: '0.5rem'}}>{this.state.MOVIE.vote_average}</span>
                                
                                <span style={{float: 'right', display: 'inline', marginLeft: '0.5rem', color: '#9e9e9e'}}>{
                                this.state.MOVIE.release_date
                                ? this.state.MOVIE.release_date.slice(0,4)
                                : ''
                                }</span>
                                <span style={{float: 'right', marginLeft: '0.5rem', color: '#9e9e9e', textTransform: 'uppercase'}}>{this.state.MOVIE.runtime} min /</span>
                                <span style={{float: 'right', color: '#9e9e9e', textTransform: 'uppercase'}}>{this.state.MOVIE.original_language} /</span>
                    </Box>

                    <h4>Genres</h4>
                    
                    {this.state.genres.map(genre => 
                    <h5 style={{display: 'inline-block'}}key={genre.id}>
                        <Link
                            key={genre.id}
                            style={{textDecoration: 'none', color: '#546e7a'}} 
                            to={{
                            pathname: `/Genres/${genre.id}`
                        }}>
                       
                            {genre.name}

                            <i className="material-icons" style={{color: "#546e7a", float: "left", marginRight: '0.25rem'}}>
                            play_circle_filled
                            </i>
                        </Link>
                    </h5>
                    )}
                    

                    <h4>Synopsis</h4>
                        <article>{this.state.MOVIE.overview}</article>
                    <h4>Cast</h4>
                    <div className="link__wrapper">
                    {this.state.CAST && this.state.CAST.map((CAST, index) => {
                    if(index >= 6) return null;
                    return(
                            <Fade key={CAST.id}>
                            <Link
                                to={{
                                    pathname: `/Person/${CAST.id}` 
                                }}
                            >
                                <img
                                alt={CAST.name} 
                                src={CAST.profile_path
                                    ? `https://image.tmdb.org/t/p/original${CAST.profile_path}`
                                    : placeholderCast
                                } />
                            </Link>
                            </Fade>
                    )
                    })}
                    </div>
                </div>
            </div>
            </Fade>  
            </div>
        )
    }
}

export default Movie;

/*

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

                          */