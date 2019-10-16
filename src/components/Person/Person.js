import React, { Component } from 'react'
import { Fade } from "react-reveal";
import placeholderImg from "../../placeholderPerson.jpg";
import '../Movie/Movie.scss'
import {BASIC_PERSON_URL, BASIC_PERSON_END_URL, BASIC_PERSON_PICTURE_URL, dummy} from '../../services/services'
import PersonMovies from '../PersonMovies/PersonMovies'

let id;

class Person extends Component {

    state = {
        PERSON: [],
        loading: true
    }
    
    componentDidMount = async() => {
        // const id = this.props.location.state.id;
        id = this.props.match.params.name
        const MOVIE_RESULTS = await fetch(`${BASIC_PERSON_URL}${id}${BASIC_PERSON_END_URL}`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ PERSON: DATA });
    }

    handleBackBtn = () => {
        if(this.props.location.state !== undefined) {
        this.props.history.push(this.props.location.state.history.pathname + this.props.location.state.history.search);
        }
    };

    render() {
        const loading = this.state;
        let personNameLoading = this.state.PERSON.name;
        personNameLoading = personNameLoading || 0;


        if(!personNameLoading && loading && !this.state.PERSON.errors) { // Ha neem létezik az ember és tölt ( ami mindig igaz ) akkor töltőkép
            return (
              <div>
                  <div>
                    <div className="loading-indicator">
                      <div className="circle"/> 
                      <div className="circle circle-2" />
                      <div className="circle circle-3" />
                    </div>
                  </div>
              </div>
            );
        }

        return (
            <React.Fragment>
            <div className="wrapper">
           
            <div className="movie__wrapper">
                    <div className="image__wrapper">
                    <Fade>
                        <img
                        alt={this.state.PERSON.id} 
                        src={
                        this.state.PERSON.profile_path 
                        ? `${BASIC_PERSON_PICTURE_URL}${this.state.PERSON.profile_path}` 
                        : placeholderImg
                        }/>
                    </Fade>
                    </div>
                    
                <div className="movie__details">
                    <h1 className="header__wrapper">
                    <p>{
                        this.state.PERSON.name
                        ? this.state.PERSON.name
                        : dummy.personName
                        }</p>
                    </h1>

                    <h4>BirthDay
                        <br/>
                        <span style={{display: 'inline-block', marginTop: '0.5rem', color: '#546e7a'}}>{this.state.PERSON.birthday}</span>
                    </h4>
                    
                    <h4>Biography</h4>
                    <article>{this.state.PERSON.biography}</article>
            
                    {this.props.location.state !== undefined
                    ? <button className="trailer__button" id="inversed" style={{float: 'right', display: 'inline-block'}} onClick={this.handleBackBtn}>Back</button>
                    : ''
                    }
                </div>
            </div>
            </div>
            <PersonMovies id={id} url={this.props.match.url}/>
            </React.Fragment>
        )
    }
}

export default Person;