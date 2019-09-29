import React, { Component } from 'react'

class Genres extends Component {

    state = {
        MOVIES: [],
        genre: this.props.location.state.genre
    }
    
    componentDidMount = async () => {
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.state.genre}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ MOVIES: DATA.results });
        console.log(this.state.genre)
    }

    render() {
        return (
            <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {

                    return(
                        <div>
                            {MOVIE.title}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Genres;