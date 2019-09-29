import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import './Sidebar.scss';

class Sidebar extends Component {
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
            </div>
        )
    }
}

export default Sidebar;
