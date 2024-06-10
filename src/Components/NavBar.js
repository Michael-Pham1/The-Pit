import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import LogOutNav from "./LogOutNav";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <LogOutNav />
      </ul>
    </nav>

  );
};

export default NavBar;
