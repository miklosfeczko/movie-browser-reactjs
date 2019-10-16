import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Fade } from "react-reveal";
import Box from '@material-ui/core/Box';
import placeholderImg from "../../placeholder.jpg";
import {BASIC_UPCOMING_URL} from '../../services/services'
import {StyledRating} from '../../utils/StyledRating'
import '../Popular/Popular.scss'


let count = 1;

class Upcoming extends Component {

    state = {
        MOVIES: [],
        total: ''
    }
    
   componentDidMount = async() => {
        if (count !== 0) {
        const MOVIE_RESULTS = await fetch(`${BASIC_UPCOMING_URL}${count}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES:DATA.results,
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
        fetch(`${BASIC_UPCOMING_URL}${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ 
                            MOVIES: DATA.results
        }))}
        else if (count === 0) {
            count = 1;        
        }
    }

    componentDidUpdate() {
        //////// OLD //////// if (Number(this.props.location.search.substr(6)) !== count && Number(this.props.location.search.substr(6)) !== 0)
        if (Number(this.props.location.search.substr(6)) !== count) {
          this.fetchMovies()
          count = Number(this.props.location.search.substr(6));     
        } else return   
  }

    nextPage = async () => {
        if (count < this.state.total) {
        this.setState({
            MOVIES: []
         })
        count = count+1;
        fetch(`${BASIC_UPCOMING_URL}${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`${BASIC_UPCOMING_URL}${count}`)
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
            moviesLength = <Redirect to={`/Upcoming/?page=1`} />
            } else if(this.props.location.search.substr(6) === '' || this.props.location.search.substr(6) === 0) {
            moviesLength = <Redirect to={`/Upcoming/?page=1`} />
            } else if (count === 0 && this.props.location.search.substr(6) === '' ) {
            moviesLength = <Redirect to={`/Upcoming/?page=1`} />
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

            <div className="bottom__container">
                <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {
                    
                    return(
                        
                            <Fade key={MOVIE.id}>
                            <div className="poster__item">                           
                                <Link
                                style={{textDecoration: 'none'}} 
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
                 </div>
                 <Link
                 to={`?page=${count-1}`}
                 >{backButtonVisible}</Link>
                <Link
                to={`?page=${count+1}`}
                >{nextButtonVisible}</Link>    
            </div>
            </React.Fragment>
        )
    }
}

export default Upcoming;