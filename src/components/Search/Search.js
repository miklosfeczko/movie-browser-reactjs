import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=1&include_adult=false`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES: DATA.results,
            total: DATA.total_pages
         });
    }
    
    fetchMovies() { 
        count = 1; // setting default value after search is submitted.
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=1&include_adult=false`)
          .then(response => response.json())
          .then(DATA => this.setState({ 
                                        MOVIES: DATA.results,
                                        total: DATA.total_pages
                                    }))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.name !== this.props.match.params.name) {
          this.fetchMovies()
        } else return
    }

    nextPage = async () => {
        if (count < this.state.total) {
        this.setState({
            MOVIES: []
         })
        count = count+1;
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=${count}&include_adult=false`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=${count}&include_adult=false`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }
    
    render() {
        let backButtonVisible;
        let nextButtonVisible;

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
                        
                                <div className="poster__item" key={MOVIE.id}>
                                <Link 
                                    style={{ textDecoration: 'none'}}
                                    key={MOVIE.id} 
                                    to={{
                                     pathname: `/Movie/${MOVIE.id}`                      
                                    }}>
                                <img
                                alt={MOVIE.title}
                                src={    
                                    `https://image.tmdb.org/t/p/original${MOVIE.poster_path}`                                  
                                } 
                                />                    
                                <p className="poster__title">{MOVIE.title}</p>
                                </Link>
                                </div>
                                                                         
                    )
                })}
            </div>
            {backButtonVisible}
            {nextButtonVisible}
            </div>
            </React.Fragment>
        )
    }
}

export default Search;