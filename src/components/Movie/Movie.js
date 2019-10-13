import React, { Component } from 'react'
import ModalVideo from 'react-modal-video'
import {Link, Redirect} from 'react-router-dom'
import { Fade } from "react-reveal";
import Box from '@material-ui/core/Box';
import {StyledRating} from '../../utils/StyledRating'
import placeholderImg from "../../placeholder.jpg";
import placeholderCast from '../../placeholderRiddle.jpg'
import {BASIC_MOVIE_URL, BASIC_MOVIE_END_URL, BASIC_MOVIE_CAST_END_URL, dummy, BASIC_MOVIE_POSTER_URL} from '../../services/services'

import './Movie.scss'

let id;

class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            MOVIE: [],
            CAST: [],
            genres: [],
            trailer: [],
            loading: true
        }
        this.openModal = this.openModal.bind(this)
    }

    componentDidMount = async() => {
        id = this.props.match.params.name
        const MOVIE_RESULTS = await fetch(`${BASIC_MOVIE_URL}${id}${BASIC_MOVIE_END_URL}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIE: DATA,
            genres: DATA.genres
         });

        const CAST_RESULTS = await fetch(`${BASIC_MOVIE_URL}${id}${BASIC_MOVIE_CAST_END_URL}`);
        const CAST_DATA = await CAST_RESULTS.json();
        this.setState({ CAST: CAST_DATA.cast })

        const TRAILER_RESULT = await fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=e8146f65b965e0a1cb0600c774f8a2a6`)
        const TRAILER_DATA = await TRAILER_RESULT.json();
        this.setState({ trailer: TRAILER_DATA.results })

        console.log(this.state.MOVIE)
    }

    openModal () {
        this.setState({isOpen: true})
    }

    handleBackBtn = () => {
        if(this.props.location.state !== undefined) {
        this.props.history.push(this.props.location.state.history.pathname + this.props.location.state.history.search);
        }
    };

    render() {
    const loading = this.state;
    console.log(this.props.location)

    if(!this.state.MOVIE.title && loading && !this.state.MOVIE.status_code) {
        return (
          <div>
              <div>
                <div className="loading-indicator">
                  <div className="circle"/> 
                  <div className="circle circle-2" />
                  <div className="circle circle-3" />
                </div>
              </div>
          </div>
        );
    }

        return (
            <div className="wrapper">
            <div className="movie__wrapper">
                
                    <div className="image__wrapper">
                        <img
                        alt={this.state.MOVIE.title} 
                        src={
                        this.state.MOVIE.poster_path 
                        ? `${BASIC_MOVIE_POSTER_URL}${this.state.MOVIE.poster_path}` 
                        : placeholderImg
                        }/>
                    </div>
                
                <div className="movie__details">
                    <h1 className="header__wrapper">
                    <p>{
                        this.state.MOVIE.title
                        ? this.state.MOVIE.title
                        : dummy.movieName
                        }</p>
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
                    
                    {this.state.genres && this.state.genres.map(genre => 
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
                                    pathname: `/Person/${CAST.id}`,
                                    state: {
                                        history: this.props.location
                                    } 
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
                    
                    {this.state.trailer && this.state.trailer.map((trailer, index) => {
                    if(index >= 1) return null;
                    
                    return(
                        <div key={trailer.id}>
                            <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId={trailer.key} onClose={() => this.setState({isOpen: false})} />
                            <button className="trailer__button" style={{float: 'left', display: 'inline-block'}} onClick={this.openModal}>Trailer</button>
                        </div>
                    )
                    
                    })}
                    {this.props.location.state !== undefined
                    ? <button className="trailer__button" id="inversed" style={{float: 'right', display: 'inline-block'}} onClick={this.handleBackBtn}>Back</button>
                    : ''
                    }
                </div>
            </div>
            </div>
        )
    }
}

export default Movie;
