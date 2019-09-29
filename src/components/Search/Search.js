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
    
    fetchMovies = async () => { 
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&query=${this.props.match.params.name}&page=1&include_adult=false`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ MOVIES: DATA.results })    
    }

    /*componentDidUpdate(prevProps) {
        const {
          match: {
            params: { postId }
          }
        } = this.props;
        const prevPostId = prevProps.match.params.postId;
        if (prevPostId !== postId) {
          this.fetchPostData(postId);
        }
      }*/

    componentDidUpdate(prevProps) {
        if (this.state.name !== prevProps.match.params.name) {
          this.fetchMovies()
        } else {
          this.fetchMovies()
        }
    }
    
    render() {
        console.log(this.state.name);
        console.log(this.props.match.params.name)
               
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