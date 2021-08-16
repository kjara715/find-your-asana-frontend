import React, {useContext} from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav} from "reactstrap";
import UserContext from "./userContext";

function NavBar({logout}) {

  const currentUser=useContext(UserContext);

    return (
      <div>
        <Navbar  className="navbar navbar-expand-lg ">

          <NavLink exact to="/" className="navbar-brand">
            Find Your Asana
          </NavLink>
          
          <Nav className="ml-auto" navbar>
            {!currentUser ? 
            <>
            <NavLink className="nav-option" to="/signup">Create an account </NavLink>
            <NavLink className="nav-option" to="/login">Login </NavLink>
            </> :  
            <>
            <NavLink className="nav-option" to={`/users/${currentUser.username}`}>Profile Page </NavLink>
            <button type="button" style={{backgroundColor: ' rgb(167, 72, 88)'}} className="btn btn-secondary" onClick={logout}>Logout {currentUser.username}</button>
            </>}
          </Nav>
        </Navbar>
      </div>
    );
  }
  //
  
  export default NavBar;