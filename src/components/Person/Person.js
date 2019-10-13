import React, { Component } from 'react'
import { Fade } from "react-reveal";
import placeholderImg from "../../placeholderPerson.jpg";
import '../Movie/Movie.scss'

class Person extends Component {

    state = {
        PERSON: []
    }
    
    componentDidMount = async() => {
        // const id = this.props.location.state.id;
        const id = this.props.match.params.name
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ PERSON: DATA });
        console.log(this.state.PERSON);
    }


    render() {
        return (
            <div className="wrapper">
            <Fade>
            <div className="movie__wrapper">
                    <div className="image__wrapper">
                        <img
                        alt={this.state.PERSON.id} 
                        src={
                        this.state.PERSON.profile_path 
                        ? `https://image.tmdb.org/t/p/original${this.state.PERSON.profile_path}` 
                        : placeholderImg
                        }/>
                    </div>
                    
                <div className="movie__details">
                    <h1 className="header__wrapper">
                    <p>{this.state.PERSON.name}</p>
                    </h1>

                    <h4>BirthDay
                        <br/>
                        <span style={{display: 'inline-block', marginTop: '0.5rem', color: '#546e7a'}}>{this.state.PERSON.birthday}</span>
                    </h4>
                    
                    <h4>Biography</h4>
                    <article>{this.state.PERSON.biography}</article>
            
                </div>
            </div>
            </Fade>
            </div>
        )
    }
}

export default Person;