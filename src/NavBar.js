import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { compareLoose } from "semver";

function NavBar({error}) {
  let erMsg;
  if(error) erMsg = (<h1 style={{color:"orange"}}>{error}</h1>)
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Sign Up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/logout">Logout</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/companies">Company List</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      {erMsg}
    </div>
  );
}

export default NavBar;
