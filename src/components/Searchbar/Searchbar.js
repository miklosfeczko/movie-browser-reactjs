import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Searchbar extends Component {

    state = {
        term: ''
      };

    onSearchChange(term) {
        this.setState({ term })
    }


    render() {
        
        return (
            <div className="main__container">  
            <form>   
                  <input 
                    type="text" 
                    className="form-control" 
                    onChange={e => this.onSearchChange(e.target.value)} 
                    value={this.state.term} 
                    name="search" 
                    placeholder="Type here to search"
                    spellCheck="false"
                    />
                <Link to={{
                    pathname: `/Search/${this.state.term}`,
                    state: { text: this.state.term }
                }}>
                    <button>Submit</button>
                </Link>
            </form> 
            </div>
        )
    }
}

export default Searchbar;