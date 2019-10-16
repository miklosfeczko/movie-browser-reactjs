import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import Box from '@material-ui/core/Box';
import placeholderImg from "../../placeholder.jpg";
import {StyledRating} from '../../utils/StyledRating'
import placeholderCast from '../../placeholderRiddle.jpg'


class Popular extends Component {

    state = {
        MOVIES: []
    }

    componentDidMount = async() => {
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/person/${this.props.id}/movie_credits?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES: DATA.cast
        });
    }


    render() {
    let defaultMovie;
    if (this.state.MOVIES.length === 0) {
        
            defaultMovie = <div className="poster__item">
                <img
                    alt='placeholder'
                    src={placeholderCast}                                            
                />      
            </div>
        
    }

        return (
            <React.Fragment>
            <div className="top__title__container">
                <p className="left__title">
                {this.state.MOVIES.length !== 0
                ? 'Stars in'
                : 'No more movies to show'
                }
                 <br/>
                <span className="second__title">movies</span>
                </p>
            </div>
            
            <div className="bottom__container">  
            <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {
                    
                    return(
                                <Fade key={MOVIE.id}>
                                <div className="poster__item">
                                <Link
                                    style={{ textDecoration: 'none'}}
                                    to={{
                                     pathname: `/Movie/${MOVIE.id}`,
                                     state: {
                                         backButton: true,
                                         history: this.props.url
                                        }                      
                                    }}>
                                <img
                                alt={MOVIE.title}
                                src={MOVIE.poster_path
                                   ? `https://image.tmdb.org/t/p/w342${MOVIE.poster_path}`     
                                   : placeholderImg                             
                                }
                                />                    
                                <p className="poster__title">{MOVIE.title}</p>
                                <Box style={{textAlign: 'center'}}>
                                <StyledRating name="half-rating" value={MOVIE.vote_average/2} precision={0.25} readOnly/>
                                </Box>
                                </Link>
                                </div>
                                </Fade>
                                                                         
                    )             
                })}
                {defaultMovie}
           </div>         
            </div>
            
            </React.Fragment>
        )
    }
}

export default Popular;