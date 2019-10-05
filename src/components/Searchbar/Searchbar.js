import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import './Searchbar.scss'

class Searchbar extends Component {

    state = {
        term: ''
      };

    onSearchChange(term) {
        this.setState({ term })
    }


    render() {
        
        return (
           
            <div className="searchbar__container">
            <form 
            className="right">   
                  <input 
                    autoComplete="off"
                    type="text" 
                    className="form-control" 
                    onChange={e => this.onSearchChange(e.target.value)} 
                    value={this.state.term} 
                    name="search" 
                    placeholder="Search for a movie"
                    spellCheck="false"
                    />
                <Link 
                to={{
                    pathname: `/Search/${this.state.term}`
                }}>
                    <i className="material-icons">search<button></button></i>
                </Link>
            </form> 
            </div>
            
        )
    }
}

export default Searchbar;