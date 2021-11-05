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
            curGenre:["All Genres"]
        }
    }

    async componentDidMount(){
        var movieData=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4de9a85a4c8bce8f827138df0694474f&language=en-US&page=${this.state.curPage}`);
        const data= movieData.data.results;
        console.log(data);
        this.setState({
            movieList:[...data]
        })
    }

    render() {
        //const moviesRes=movies.results;
        const genreList={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        var availableGenre=["All Genres"];

        this.state.movieList.map((movie)=>{
            if( !availableGenre.includes(genreList[movie.genre_ids[0]])){
                availableGenre.push(genreList[movie.genre_ids[0]]);
            }
        })

        return (
            <div>
                <div className="main">
                <div className="row">
                    <div className="col-3">
                        <div className="left">
                            <div className="row row-cols-1">
                                {
                                    availableGenre.map((genre)=>(
                                        genre == this.state.curGenre?
                                        <div className="col left-col" style={{backgroundColor:"#1556a0", color:"#ffffff", fontWeight:"bold"}}>{genre}</div>
                                        :
                                        <div className="col left-col" style={{color:"#1556a0"}}>{genre}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row row-cols-1">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Search" aria-label="Username" />
                                <input type="number" class="form-control" placeholder="Count Of Results" aria-label="Server" />
                            </div>

                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Popularity</th>
                                    <th scope="col">Rating</th>
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
                                            <td>{genreList[movie.genre_ids[0]]}</td>
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
