import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {upcoming_movie} from '../../services/services'
import {BASIC_UPCOMING_URL} from '../../services/services'

import '../Popular/Popular'

let count = 1;

class Upcoming extends Component {

    state = {
        MOVIES: [],
        total: ''
    }
    
   componentDidMount = async() => {
        const MOVIE_RESULTS = await upcoming_movie();
        this.setState({ 
            MOVIES: MOVIE_RESULTS.results,
            total: MOVIE_RESULTS.total_pages
        });
    }

    nextPage = async () => {
        if (count < this.state.total) {
        this.setState({
            MOVIES: []
         })
        count = count+1;
        fetch(`${BASIC_UPCOMING_URL}${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    backPage = async () => {
        if (count > 1) {
        this.setState({ MOVIES: []})
        count = count-1;
        fetch(`${BASIC_UPCOMING_URL}${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ MOVIES: DATA.results }))
        } else return
    }

    render() {
        return (
            <React.Fragment>
            <div className="top__title__container">
                <p className="left__title">
                {this.props.match.path.substr(1)} <br/>
                <span className="second__title">movies</span>
                </p>
            </div>

            <div className="bottom__container">
                <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {

                    return(
            
                            <div key={MOVIE.id} className="poster__item">
                                <Link
                                style={{textDecoration: 'none'}} 
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
                <button style={{float: 'left'}} onClick={this.backPage}>Back</button>
                <button className="bottom__button__margin__right" onClick={this.nextPage}>Next</button>      
            </div>
            </React.Fragment>
        )
    }
}

export default Upcoming;