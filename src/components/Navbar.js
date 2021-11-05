import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component{
    render(){
        return (
            <div style={{display:'flex', height:"100px",flexDirection:"row",alignItems:"center", color:"#1556a0"}}>
                <Link to="/" style={{textDecoration:"none"}}><h1>Movies App</h1></Link>
                <Link to="/favourite" style={{textDecoration:"none"}}><h3 style={{paddingLeft:"20px"}}>Favourites</h3></Link>
            </div>
        )
    }
}