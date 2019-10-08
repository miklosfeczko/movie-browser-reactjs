import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BASIC_GENRES_SORT_URL, FILLER_GENRES_SORT_URL, 
        END_GENRES_SORT_URL, FILLER_GENRES_NAVBUTTON_SORT_URL} from '../../services/services'

let count = 1;
let sort = 'popularity.desc';

class Genres extends Component {
    state = {
        MOVIES: [],
        total: ''
    }
    
    componentDidMount = async () => {
        const MOVIE_RESULTS = await fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${this.props.match.params.name}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES: DATA.results,
            total: DATA.total_pages
         });
    }

    fetchMovies() {
        count = 1;
        fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ 
                            MOVIES: DATA.results
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
        fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_NAVBUTTON_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_NAVBUTTON_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    sortChangeTitleAsc = async () => {
        this.setState({ MOVIES: []})
        sort = 'original_title.asc'
        fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
    }

    sortChangePopular = async () => {
        this.setState({ MOVIES: []})
        sort = 'popularity.desc'
        fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
    }

    sortChangeVoteAvg = async () => {
        this.setState({ MOVIES: []})
        sort = 'vote_average.desc'
        fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
    }

    sortChangeReleaseDate = async () => {
        this.setState({ MOVIES: []})
        sort = 'release_date.desc'
        fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
    }

    
    render() {
        let genre;
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


        switch(this.props.match.params.name) {
            case '28': genre = 'Action';
                break;
            case '12': genre = 'Adventure';
                break; 
            case '16': genre = 'Animation';
                break;
            case '35': genre = 'Comedy';
                break;   
            case '80': genre = 'Crime';
                break;
            case '99': genre = 'Documentary';
                break;
            case '18': genre = 'Drama';
                break;
            case '10751': genre = 'Family';
                break;
            case '14': genre = 'Fantasy';
                break;
            case '36': genre = 'History';
                break;
            case '27': genre = 'Horror';
                break;
            case '10402': genre = 'Music';
                break;
            case '9648': genre = 'Mystery';
                break;
            case '10749': genre = 'Romance';
                break;
            case '878': genre = 'Science Fiction';
                break;
            case '10770': genre = 'TV Movie';
                break;
            case '53': genre = 'Thriller';
                break;
            case '10752': genre = 'War';
                break;
            case '37': genre = 'Western';
                break;
            default: genre = 'Unknown';
        }

        return (
            <React.Fragment>
             <div className="top__title__container">
                <p className="left__title">
                {genre} <br/>
                <span className="second__title">movies</span>
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

export default Genres;

/*  <button onClick={this.sortChangeTitleAsc}>Sort Title Asc</button>
                <button onClick={this.sortChangePopular}>Sort Popular</button>
                <button onClick={this.sortChangeVoteAvg}>Sort Vote Avg</button>
                <button onClick={this.sortChangeReleaseDate}>Sort Release Date</button> */