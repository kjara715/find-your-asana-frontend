import React from "react";
import CategoryList from './CategoryList';
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {

    return (
      <div className="center"> 
        <div className="home">
        <br/>
          <h1 className="title"><b>Find Your Asana</b></h1>
          <h4 className ="description">A beginner's guide to common yoga postures</h4>
          <p>Browse by category below, or <Link exact to="/yogaposes"><b>Click here</b></Link> to browse all poses.</p>
          <CategoryList />
        </div> 
    </div>
      
    );
  }
  
  export default Home;
  