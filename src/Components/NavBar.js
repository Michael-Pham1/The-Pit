import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import LogOutNav from "./logOut";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <LogOutNav />
        </li>

      </ul>
    </nav>

  );
};

export default NavBar;
