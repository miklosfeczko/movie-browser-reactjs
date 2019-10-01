import React, { Component } from 'react'

let count = 1;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          MOVIES: []
        }
    }

    componentDidMount = async () => {
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=1&include_adult=false`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ MOVIES: DATA.results });
    }
    
    fetchMovies() { 
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=1&include_adult=false`)
          .then(response => response.json())
          .then(DATA => this.setState({ MOVIES: DATA.results }))
        //this.setState({ MOVIES: DATA.results })    
    }


    componentDidUpdate(prevProps) {
        if (prevProps.match.params.name !== this.props.match.params.name) {
          this.fetchMovies()
        } else return
    }

    nextPage = async () => {
        console.log(this.state.page)
        this.setState({
            MOVIES: []
         })
        count = count+1;
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=${count}&include_adult=false`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        console.log(this.state.page)
        console.log(count)
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=${count}&include_adult=false`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
        console.log(this.state.page)
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

export default Search;