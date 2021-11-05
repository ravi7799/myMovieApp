import React, { Component } from 'react';

import axios from 'axios';


export default class Movies extends Component {

    constructor(){
        super();
        this.state={
            hover:"",
            parr:[1],
            curPage:1,
            movies:[],
        }
    }

    async componentDidMount(){
        //Side effects
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4de9a85a4c8bce8f827138df0694474f&language=en-US&page=${this.state.curPage}`)
        let data=res.data;
        this.setState({
            movies:[...data.results]
        })
        console.log("mounting done");
    }

    changeMovie=async ()=>{
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4de9a85a4c8bce8f827138df0694474f&language=en-US&page=${this.state.curPage}`)
        let data=res.data;

        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=()=>{
        let newPages=[];

        for(var i=1;i<=this.state.parr.length+1;i++){
            newPages.push(i);
        }

        this.setState({
            parr:[...newPages],
            curPage:this.state.curPage+1,
        },this.changeMovie)
    }

    handleLeft=()=>{
        if(this.curPage != 1){
            this.setState({
                curPage:this.state.curPage-1,
            },this.changeMovie)
        }
    }

    handleClick=(page)=>{
        this.setState({
            curPage:page,
        },this.changeMovie)
    }

    render() {
        console.log("render");
    
        return (
            this.state.movies==""?(
                <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>)
            :(<div className="trending">
                <div className="trending-heading" style={{marginTop:"30px"}}>
                    <h3><strong>Trending</strong></h3>
                </div>
                <div className="trending-data">
                    {
                        this.state.movies.map((movie)=>{
                            return (movie==undefined?(
                                    <div className="spinner-border text-warning" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ):(
                                    <div className="card movie-card" onMouseEnter={()=> this.onHover(movie.id)} onMouseLeave={this.onLeave}>
                                        <img src={`https://images.tmdb.org/t/p/original/${movie.backdrop_path}`} className="card-img-top" alt={movie.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.title}</h5>
                                            {
                                                this.state.hover==movie.id && 
                                                <p className="card-text card-data">{movie.overview}</p>
                                            }
                                            <a href="#" className="btn btn-primary">Click To Watch</a>
                                        </div>
                                    </div>
                                )
                                )
                        })                
                    }
                </div>
                <div className="page-change page-footer">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {
                                this.state.parr.map((value)=>(
                                    <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                ))
                            }
                            <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            )
        )
    }

    onHover=(id)=>{
        this.setState({
            hover:id
        })
    }
    onLeave=()=>{
        this.setState({
            hover:""
        })
    }
}
