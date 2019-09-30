import React, { Component } from 'react'

class Genres extends Component {
    state = {
        MOVIES: []
    }
    
    componentDidMount = async () => {
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.props.location.state.id}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ MOVIES: DATA.results });
    }

    fetchMovies = async () => {
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.props.location.state.id}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ MOVIES: DATA.results });
    }

   componentDidUpdate(prevProps) {
          if (prevProps.match.params.name !== this.props.match.params.name) {
            this.fetchMovies()
          } else {
              return
          }
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
            </div>
        )
    }
}

export default Genres;