import React, { Component } from 'react'

import { movies } from './getMovies'

export default class Banner extends Component {
    render() {
        let movieInfo=movies.results[0];
        return (
            <>{ 
                (
                movieInfo == ""
                ?<div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> 
                :<div className="card banner-card">
                        <img src={`https://images.tmdb.org/t/p/original/${movieInfo.backdrop_path}`} className="card-img-top banner-image" alt={ movieInfo.title } />
                        <div className="card-body banner-text">
                            <h5 className="card-title">{movieInfo.title}</h5>
                            <p className="card-text">{movieInfo.overview}</p>
                        </div>
                </div>
                )
            }</>
        )
    }
}
