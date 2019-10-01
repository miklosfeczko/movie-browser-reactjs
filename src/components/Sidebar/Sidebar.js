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
            <div className="sidebar__main">
                <Link to={{
                     pathname: `/Popular/`
                }}>Popular</Link>
                <Link to={{
                     pathname: `/Toprated/`
                }}>Top Rated</Link>
                <Link to={{
                     pathname: `/Upcoming/`
                }}>Upcoming</Link>

                {this.state.GENRES && this.state.GENRES.map((GENRE) => {
                return(
                    <div key={GENRE.id}>
                        <Link to={{
                        pathname: `/Genres/${GENRE.id}`,
                        state: { 
                            id: `${GENRE.id}`,
                            name: `${GENRE.name}`
                         }
                        }}>
                            {GENRE.name}
                        </Link>
                    </div>
                )
                })}
            </div>
        )
    }
}

export default Sidebar;
