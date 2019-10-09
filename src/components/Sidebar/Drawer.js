import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BASIC_SIDEBAR_GENRES_URL} from '../../services/services'

import './Sidebar.scss';

class Sidebar extends Component {
    state = {
        GENRES: []
    }

    componentDidMount = async () => {
        const GENRE_RESULTS = await fetch(`${BASIC_SIDEBAR_GENRES_URL}`);
        const DATA = await GENRE_RESULTS.json();
        this.setState({ GENRES: DATA.genres });
    }

    render() {
        return (
            <div className="sidebar__drawer" id="sidebarId2" >   
                <p>discover</p>   
                    <Link
                    className="list" 
                    style={{textDecoration: 'none'}}
                    to={{
                        pathname: `/Popular/`
                    }}><i className="material-icons">
                    favorite
                    </i>Popular</Link>
                    <Link
                    className="list"
                    style={{textDecoration: 'none'}} 
                    to={{
                        pathname: `/Toprated/`
                    }}><i className="material-icons">
                    insert_chart
                    </i>Top Rated</Link>
                    <Link
                    className="list"
                    style={{textDecoration: 'none'}} 
                    to={{
                        pathname: `/Upcoming/`
                    }}><i className="material-icons">
                    calendar_today
                    </i>Upcoming</Link>
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
                            <i className="material-icons">
                                play_circle_filled
                            </i>
                            {GENRE.name}
                            </div>
                        </Link>
                )
                })}
                <div style={{ paddingTop: '3rem'}}></div>
            </div>
        )
    }
}

export default Sidebar;
