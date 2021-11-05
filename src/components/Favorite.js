import React, { Component } from 'react'

import axios from 'axios';

import { movies } from './getMovies';

export default class Favorite extends Component {
    constructor(){
        super();
        this.state={
            search:"",
            records:3,
            pagen:1,
            movieList:[],
            parr:[1],
            genres:[],
            curGenre:["All Genres"],
            genreList:{},
            curSearchText:"",
        }
    }

    async componentDidMount(){
        const data=JSON.parse(localStorage.getItem("movie_fav") || "[]");
        var availableGenre=["All Genres"];
        const genreData={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        data.map((movie)=>{
            if( !availableGenre.includes(genreData[movie.genre_ids[0]])){
                availableGenre.push(genreData[movie.genre_ids[0]]);
            }
        })
        
        this.setState({
            movieList:[...data],
            genres:[...availableGenre],
            genreList:{...genreData}
        })
    }

    handleGenres=(genre)=>{
        let data=JSON.parse(localStorage.getItem("movie_fav") || "[]");
        
        if(genre != 'All Genres'){
            data=data.filter((movie)=>{
                return this.state.genreList[movie.genre_ids[0]]==genre;
            })
        }

        this.setState({
            curGenre:genre,
            movieList:[...data]
        })        
    }

    handleSearchChange=(text)=>{
        let data=JSON.parse(localStorage.getItem("movie_fav") || "[]");

        if(text != "" && text != " "){
            data=data.filter((movie)=>{
                let name=movie.title.toLowerCase();
                return name.includes(text.toLowerCase());
            })
        }

        this.setState({
            curSearchText: text,
            movieList: [...data]
        })
    }

    sortPopular=(desc)=>{
        let data=[...this.state.movieList];
        
        if(!desc)
            data.sort(function(a,b){return a.popularity-b.popularity});
        else
            data.sort(function(a,b){return -a.popularity+b.popularity});

        this.setState({
            movieList: [...data],
        })
    }

    sortRating=(desc)=>{
        let data=[...this.state.movieList];
        
        if(!desc)
            data.sort(function(a,b){return a.vote_average-b.vote_average});
        else
            data.sort(function(a,b){return -a.vote_average+b.vote_average});

        this.setState({
            movieList: [...data],
        })
    }

    render() {
        return (
            <div>
                <div className="main">
                <div className="row">
                    <div className="col-3">
                        <div className="left">
                            <div className="row row-cols-1">
                                {
                                    this.state.genres.map((genre)=>(
                                        genre == this.state.curGenre?
                                        <div className="col left-col" style={{backgroundColor:"#1556a0", color:"#ffffff", fontWeight:"bold"}}>{genre}</div>
                                        :
                                        <div className="col left-col" style={{color:"#1556a0"}}  onClick={()=>this.handleGenres(genre)} >{genre}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row row-cols-1">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Search" aria-label="Username" value={this.state.curSearchText} onChange={(e)=>this.handleSearchChange(e.target.value)}/>
                                <input type="number" class="form-control" placeholder="Count Of Results" aria-label="Server" />
                            </div>

                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"><i class="fas fa-sort-up" onClick={()=>this.sortPopular(false)}></i>Popularity<i class="fas fa-sort-down" onClick={()=>this.sortPopular(true)}></i></th>
                                    <th scope="col"><i class="fas fa-sort-up" onClick={()=>this.sortRating(false)}></i>Rating<i class="fas fa-sort-down" onClick={()=>this.sortPopular(true)}></i></th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   
                                        this.state.movieList.map((movie)=>(
                                            <tr>
                                            <td>
                                                <div className="card favourite-movie-card">
                                                    <img src={`https://images.tmdb.org/t/p/original/${movie.backdrop_path}`} className="card-img-top favourite-movie-img" alt={movie.title} />
                                                    <h5 className="card-title">{movie.title}</h5>
                                                </div>
                                            </td>
                                            <td>{this.state.genreList[movie.genre_ids[0]]}</td>
                                            <td>{movie.popularity}</td>
                                            <td>{movie.vote_average}</td>
                                            <td><button type="button" class="btn btn-danger">Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}
