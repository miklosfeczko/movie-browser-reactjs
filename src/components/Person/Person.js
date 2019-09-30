import React, { Component } from 'react'

class Person extends Component {

    state = {
        PERSON: []
    }
    
    componentDidMount = async() => {
        const id = this.props.location.state.id;
        const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US`);
        const DATA = await MOVIE_RESULTS.json();
        this.setState({ PERSON: DATA });
        console.log(this.state.PERSON);
    }


    render() {
        return (
            <div className="main__container">
                {this.state.PERSON.biography}
            </div>
        )
    }
}

export default Person;