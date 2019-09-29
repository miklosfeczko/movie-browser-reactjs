import React, { Component } from 'react'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: this.props.location.state.text,
          MOVIES: []
        }
    }

    componentDidMount = async () => {
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.state.name}&page=1&include_adult=false`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ MOVIES: DATA.results });
    }
    
    fetchMovies() { 
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=1&include_adult=false`)
          .then(response => response.json())
          .then(DATA => this.setState({ MOVIES: DATA.results }))
        //this.setState({ MOVIES: DATA.results })    
    }


    componentDidUpdate(prevProps, prevState) {
      console.log(prevState.name)
      console.log(prevProps.match.params.name)
      console.log(this.state.name)
      console.log(this.props.match.params.name)
        if (prevProps.match.params.name !== this.props.match.params.name) {
          this.fetchMovies()
        } else if (prevState.name === this.props.match.params.name) {
          return
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
            </div>
        )
    }
}

export default Search;