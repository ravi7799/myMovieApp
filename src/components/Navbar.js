import React, { Component } from "react";

export default class Navbar extends Component{
    render(){
        return (
            <div style={{display:'flex', height:"100px",flexDirection:"row",alignItems:"center"}}>
                <h1>Movies App</h1>
                <h3 style={{paddingLeft:"20px"}}>Favourites</h3>
            </div>
        )
    }
}