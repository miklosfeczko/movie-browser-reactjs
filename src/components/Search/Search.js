import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Fade } from "react-reveal";
import placeholderImg from "../../placeholder.jpg";
import {BASIC_SEARCH_URL, BASIC_SEARCH_PAGE, BASIC_SEARCH_END} from '../../services/services'

let count = 1;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          MOVIES: [],
          total: ''
        }
    }

    componentDidMount = async () => {
        if (count !== 0) {
        const MOVIE_RESULTS = await fetch(`${BASIC_SEARCH_URL}${this.props.match.params.name}${BASIC_SEARCH_PAGE}${count}${BASIC_SEARCH_END}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES: DATA.results,
            total: DATA.total_pages
         })};
    }
    
    fetchMovies() {
        count = Number(this.props.location.search.substr(6)); // setting default value after search is submitted.
        if (count !== 0) {
        fetch(`${BASIC_SEARCH_URL}${this.props.match.params.name}${BASIC_SEARCH_PAGE}${count}${BASIC_SEARCH_END}`)
          .then(response => response.json())
          .then(DATA => this.setState({ 
                                        MOVIES: DATA.results,
                                        total: DATA.total_pages
        }))}
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.name !== this.props.match.params.name) {
            this.fetchMovies()
          } else if (Number(this.props.location.search.substr(6)) !== count) {
            this.fetchMovies()
          } else return
    }

    nextPage = async () => {
        if (count < this.state.total) {
        this.setState({
            MOVIES: []
         })
        count = count+1;
        fetch(`${BASIC_SEARCH_URL}${this.props.match.params.name}${BASIC_SEARCH_PAGE}${count}${BASIC_SEARCH_END}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`${BASIC_SEARCH_URL}${this.props.match.params.name}${BASIC_SEARCH_PAGE}${count}${BASIC_SEARCH_END}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }
    
    render() {
        let backButtonVisible;
        let nextButtonVisible;
        let moviesLength;

        if(this.props.location.search.substr(6) === '' || this.props.location.search.substr(6) === 0) {
            moviesLength = <Redirect to={`/Search/${this.props.match.params.name}?page=1`} />
            } else if (count === 0 && this.props.location.search.substr(6) === '' ) {
            moviesLength = <Redirect to={`/Search/${this.props.match.params.name}?page=1`} />
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
                {this.props.match.params.name} <br/>
                <span className="second__title">search results</span>
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
                                    key={MOVIE.id} 
                                    to={{
                                     pathname: `/Movie/${MOVIE.id}`                      
                                    }}>
                                <img
                                alt={MOVIE.title}
                                src={MOVIE.poster_path 
                                   ? `https://image.tmdb.org/t/p/original${MOVIE.poster_path}`    
                                   : placeholderImg                            
                                } 
                                />                    
                                <p className="poster__title">{MOVIE.title}</p>
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

export default Search;