import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Fade } from "react-reveal";
import {BASIC_GENRES_SORT_URL, FILLER_GENRES_SORT_URL, 
        END_GENRES_SORT_URL, FILLER_GENRES_NAVBUTTON_SORT_URL} from '../../services/services'

let count = 1;
let sort = 'popularity.desc';

class Genres extends Component {
    state = {
        MOVIES: [],
        total: '',
        loading: true
    }
    
    componentDidMount = async () => {
        const MOVIE_RESULTS = await fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES: DATA.results,
            total: DATA.total_pages
         });
    }

    fetchMovies() {
        count = Number(this.props.location.search.substr(6));
        fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ 
                            MOVIES: DATA.results
        }))
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

    handleLoader () {
        this.timeout = setTimeout(() => this.setState({ loading: false }), 500);
    }
    
    componentWillUnmount() {
        clearTimeout(this.timeout)
    }
  
    render() {
        let genre;
        let backButtonVisible;
        let nextButtonVisible;
        let moviesLength;

        if (count === 0) {
            moviesLength = <Redirect to={`/Genres/${this.props.match.params.name}?page=1`} />
            } else if (this.state.total !== '' && this.state.total < this.props.location.search.substr(6)) {
            moviesLength = <Redirect to={`/404`} />
            } else if (count < 0) {
            moviesLength = <Redirect to={`/404`} />
            } else if (this.state.total === undefined) {
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

        if (this.state.loading) {
            nextButtonVisible = <button style={{display: 'none'}} className="bottom__button__margin__right" onClick={this.nextPage}>Next</button>
            backButtonVisible = <button style={{float: 'left', display: 'none'}} onClick={this.backPage}>Back</button>
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
            {moviesLength}
             <div className="top__title__container">
                <p className="left__title">
                {genre} <br/>
                <span className="second__title">movies</span>
                </p>
            </div>

            <div className="bottom__container">  
            <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {
                     if(this.state.MOVIES && !this.state.loading) {
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
                                src={    
                                    `https://image.tmdb.org/t/p/original${MOVIE.poster_path}`                                  
                                } 
                                />                    
                                <p className="poster__title">{MOVIE.title}</p>
                                </Link>
                                </div>
                        </Fade>
                    )} else return (
                        <div key={MOVIE.id}>
                        {this.handleLoader()}
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
            </React.Fragment>
        )
    }
}

export default Genres;

/*  <button onClick={this.sortChangeTitleAsc}>Sort Title Asc</button>
                <button onClick={this.sortChangePopular}>Sort Popular</button>
                <button onClick={this.sortChangeVoteAvg}>Sort Vote Avg</button>
                <button onClick={this.sortChangeReleaseDate}>Sort Release Date</button> */