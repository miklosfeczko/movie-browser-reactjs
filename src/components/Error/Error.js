import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import HeadShake from 'react-reveal/HeadShake';
import placeholderImg from "../../placeholderNoPage.jpg";
import {dummy} from '../../services/services'
import './Error.scss'

export default class Error extends Component {
    render() {
        return (
            <div className="wrapper">
            <div className="movie__wrapper">
                
                    <div className="image__wrapper">
                    <Fade>
                        <img
                        src={placeholderImg}
                        alt={'clouds'}         
                        />
                    </Fade>
                    </div>
                
                <div className="movie__details">
                    <h1 className="header__wrapper">
                    <HeadShake><p>{dummy.errorName}</p></HeadShake>
                    </h1>
               
                    <Link to={{ pathname: '/'}}>
                        <button className="trailer__button" id="inversed" style={{float: 'left'}}>             
                         Home                  
                        </button>
                    </Link>
                </div>
            </div>
            </div>
        )
    }
}
