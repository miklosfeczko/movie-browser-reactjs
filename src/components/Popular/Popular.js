import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import Box from '@material-ui/core/Box';
import placeholderImg from "../../placeholder.jpg";
import {BASIC_POPULAR_URL} from '../../services/services'
import {StyledRating} from '../../utils/StyledRating'
import './Popular.scss'


let count = 1;

class Popular extends Component {

    state = {
        MOVIES: [],
        total: '',
        imgLoaded: false
    }

    componentDidMount = async() => {
        if (count !== 0) {
        const MOVIE_RESULTS = await fetch(`${BASIC_POPULAR_URL}${count}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES: DATA.results,
            total: DATA.total_pages
        })};
        if (this.state.total === undefined) {
            this.fetchMovies()
        }
    }

    fetchMovies() {
        count = Number(this.props.location.search.substr(6));
        count = count || 0;
        if (count !== 0) {
        fetch(`${BASIC_POPULAR_URL}${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ 
                            MOVIES: DATA.results
        }))}
        else if (count === 0) {
            count = 1;
            
        }
    }

    componentDidUpdate() {
        if (Number(this.props.location.search.substr(6)) !== count) {
          this.fetchMovies()   
          count = Number(this.props.location.search.substr(6));
        } else return
  }

    nextPage = async () => {
        if (count < this.state.total) {
        this.setState({
            MOVIES: [],
            imgLoaded: false
         })
        count = count+1;
        fetch(`${BASIC_POPULAR_URL}${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return 
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ 
            MOVIES: [],
            imgLoaded: false
        })
        count = count-1;
        fetch(`${BASIC_POPULAR_URL}${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }


    render() {
        let backButtonVisible;
        let nextButtonVisible;
        let moviesLength;
        let pageCount = Number(this.props.location.search.substr(6));

       
        if(pageCount === 0) {
            moviesLength = <Redirect to={`/Popular/?page=1`} />
            } else if(this.props.location.search.substr(6) === '' || this.props.location.search.substr(6) === 0) {
            moviesLength = <Redirect to={`/Popular/?page=1`} />
            } else if (count === 0 && this.props.location.search.substr(6) === '' ) {
            moviesLength = <Redirect to={`/Popular/?page=1`} />
            } else if (this.state.total !== '' && this.state.total < this.props.location.search.substr(6)) {
            moviesLength = <Redirect to={`/404`} />
            } else if (count < 0) {
            moviesLength = <Redirect to={`/404`} />
            } else if (this.state.total === undefined && count === 1 && this.props.location.search.substr(6) === '') {
            moviesLength = <Redirect to={`/404`} />
        } 

        if (count === 1) {
            backButtonVisible = <button style={{float: 'left', display: 'none'}} onClick={this.backPage}>Back</button>
        } else { backButtonVisible = <button style={{float: 'left'}} onClick={this.backPage}>Back</button>
        }

        if (this.state.total === count) {
            nextButtonVisible = <button style={{display: 'none'}} className="bottom__button__margin__right" onClick={this.nextPage}>Next</button>
        } else { nextButtonVisible = <button className="bottom__button__margin__right" onClick={this.nextPage}>Next</button>
        }

       
        return (
            <React.Fragment>
            {moviesLength}
            <div className="top__title__container">
                <p className="left__title">
                {this.props.match.path.substr(1)} <br/>
                <span className="second__title">movies</span>
                </p>
            </div>
            <Fade when={this.state.imgLoaded}>
            <div className="bottom__container">  
            <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {
                    
                    return(
                                
                                <div className="poster__item"  key={MOVIE.id}>
                                <Link
                                    style={{ textDecoration: 'none'}}
                                    key={MOVIE.id} 
                                    to={{
                                     pathname: `/Movie/${MOVIE.id}`,
                                     state: {
                                         backButton: true,
                                         history: this.props.location
                                        }                      
                                    }}>
                                <img
                                alt={MOVIE.title}
                                src={MOVIE.poster_path
                                   ? `https://image.tmdb.org/t/p/original${MOVIE.poster_path}`     
                                   : placeholderImg                             
                                }
                                onLoad={() => this.setState({
                                    imgLoaded: true
                                })
                                } 
                                />                    
                                <p className="poster__title">{MOVIE.title}</p>
                                <Box style={{textAlign: 'center'}}>
                                <StyledRating name="half-rating" value={MOVIE.vote_average/2} precision={0.25} readOnly/>
                                </Box>
                                </Link>
                                </div>
                                
                                                                         
                    )             
                })}
           </div>         
                 <Link
                 to={`?page=${count-1}`}
                 >{backButtonVisible}</Link>
                <Link
                to={`?page=${count+1}`}
                >{nextButtonVisible}</Link>    
            </div>
            </Fade>
            </React.Fragment>
        )
    }
}

export default Popular;