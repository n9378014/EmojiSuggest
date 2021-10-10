import React, { Component } from "react";
// Importing style sheet (TODO: remove this later)
import './App.css';
import { useState } from 'react'

// Importing pages and components
import Home from "./Home";
import Navbar from "./Navbar";
import Hexgrid from "./Hexgrid";


class App extends Component {
  render(){
    return (    
      <div className="App">
        {/* Navigation Bar Component*/}
        {/*<Navbar /> */} 
        <div className="content">
          <Hexgrid />
        </div>
      </div>
    );
  }
}

export default App;
