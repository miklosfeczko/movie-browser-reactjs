import React, { Component } from 'react'

let count = 1;

class Genres extends Component {
    state = {
        MOVIES: [],
        total: ''
    }
    
    componentDidMount = async () => {
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.props.match.params.name}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES: DATA.results,
            total: DATA.total_pages
         });
    }

    fetchMovies() {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
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
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${count}&with_genres=${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
        console.log(count)
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${count}&with_genres=${this.props.match.params.name}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
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
            </div>
        )
    }
}

export default Genres;