import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import './Sidebar.scss';

class Sidebar extends Component {
    state = {
        GENRES: []
    }

    componentDidMount = async () => {
        const GENRE_RESULTS = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US`);
        const DATA = await GENRE_RESULTS.json();
        this.setState({ GENRES: DATA.genres });
        console.log(this.state.GENRES)
    }

    render() {
        return (
            <div className="sidebar__main" id="sidebarId">   
                <p>discover</p>   
                    <Link
                    className="list" 
                    style={{textDecoration: 'none'}}
                    to={{
                        pathname: `/Popular/`
                    }}>Popular</Link>
                    <Link
                    className="list"
                    style={{textDecoration: 'none'}} 
                    to={{
                        pathname: `/Toprated/`
                    }}>Top Rated</Link>
                    <Link
                    className="list"
                    style={{textDecoration: 'none'}} 
                    to={{
                        pathname: `/Upcoming/`
                    }}>Upcoming</Link>
                <p>genres</p>
                {this.state.GENRES && this.state.GENRES.map((GENRE) => {
                return(
                        <Link
                        key={GENRE.id}
                        style={{textDecoration: 'none', color: '#9e9e9e'}} 
                        to={{
                        pathname: `/Genres/${GENRE.id}`
                        }}>
                            <div className="list">
                            {GENRE.name}
                            </div>
                        </Link>
                )
                })}
            </div>
        )
    }
}

export default Sidebar;
