import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {upcoming_movie} from '../../services/services'
import {BASIC_UPCOMING_URL} from '../../services/services'

import '../Popular/Popular'

let count = 1;

class Upcoming extends Component {

    state = {
        MOVIES: [],
        total: '',
        loading: true
    }
    
   componentDidMount = async() => {
        if (Number(this.props.location.search.substr(6)) > 0) {
        count = Number(this.props.location.search.substr(6));
        } else {
            count = 1;
        }
        const MOVIE_RESULTS = await fetch(`${upcoming_movie}${count}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ 
            MOVIES:DATA.results,
            total: DATA.total_pages
        });
    }

    fetchMovies() {
        if (Number(this.props.location.search.substr(6)) === '') {
            count = 1;
        } else {
        count = Number(this.props.location.search.substr(6));
        fetch(`${upcoming_movie}${count}`)
        .then(response => response.json())
        .then(DATA => this.setState({ 
                            MOVIES: DATA.results
        }))}
    }

    componentDidUpdate(prevProps) {
        //////// OLD //////// if (Number(this.props.location.search.substr(6)) !== count && Number(this.props.location.search.substr(6)) !== 0)
        if (Number(this.props.location.search.substr(6)) !== count) {
          this.fetchMovies()   
        } else return   
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

    handleLoader () {
        this.timeout = setTimeout(() => this.setState({ loading: false }), 1000);
    }
    
    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() { 
        let backButtonVisible;
        let nextButtonVisible;
        let moviesLength;
        
        if (count === 0) {
        moviesLength = <Redirect to={`/Upcoming/?page=1`} />
        } else if (this.state.total !== '' && this.state.total < this.props.location.search.substr(6)) {
        moviesLength = <Redirect to={`/404`} />
        } else if (count < 0) {
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

        return (
            <React.Fragment>
           {moviesLength}
            <div className="top__title__container">
                <p className="left__title">
                {this.props.match.path.substr(1)} <br/>
                <span className="second__title">movies</span>
                </p>
            </div>

            <div className="bottom__container">
                <div className="main__container">
                {this.state.MOVIES && this.state.MOVIES.map((MOVIE) => {
                    if(this.state.MOVIES && !this.state.loading) {
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
                    )} else return (
                        <div>
                        {this.handleLoader()}
                        <div className="loading-indicator">
                        <div className="circle"/>
                        <div className="circle circle-2" />
                        <div className="circle circle-3" />
                        </div>
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

export default Upcoming;