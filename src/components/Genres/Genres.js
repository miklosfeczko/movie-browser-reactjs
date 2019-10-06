import React, { Component } from 'react'
import {BASIC_GENRES_SORT_URL, FILLER_GENRES_SORT_URL, END_GENRES_SORT_URL, FILLER_GENRES_NAVBUTTON_SORT_URL} from '../../services/services'

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
        return (
            <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {

                    return(
                        <div key={MOVIE.id}>
                            {MOVIE.title}
                        </div>
                    )
                })}
                <button onClick={this.backPage}>Back</button>
                <button onClick={this.nextPage}>Next</button>
                <button onClick={this.sortChangeTitleAsc}>Sort Title Asc</button>
                <button onClick={this.sortChangePopular}>Sort Popular</button>
                <button onClick={this.sortChangeVoteAvg}>Sort Vote Avg</button>
                <button onClick={this.sortChangeReleaseDate}>Sort Release Date</button>
            </div>
        )
    }
}

export default Genres;