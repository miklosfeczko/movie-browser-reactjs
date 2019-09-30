import React, { Component } from 'react'

class Movie extends Component {

    state = {
        MOVIES: [],
        CAST: []
    }
    
    componentDidMount = async() => {
        const id = this.props.location.state.movie;
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ MOVIES: DATA });
        console.log(this.state.MOVIES);

        const CAST_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=e8146f65b965e0a1cb0600c774f8a2a6`);
        const CAST_DATA = await CAST_RESULTS.json();
        this.setState({ CAST: CAST_DATA.cast })
        console.log(this.state.CAST);
    }


    render() {
        return (
            <div className="main__container">
                {this.state.MOVIES.title}
                {this.state.CAST && this.state.CAST.map((CAST) => {

                    return(
                        <div key={CAST.cast_id}>
                            {CAST.character}
                        </div>
                    )
                    })}
            </div>
        )
    }
}

export default Movie;