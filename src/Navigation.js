import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to={"/home"} style={{ textDecoration: "none" }}>
          <img src="img/header_logo.png" alt="Logo" />
          <span>SHARE-A-BITE</span>
        </Link>
      </div>
      <div className="navbar__links">
        <Link to="/home">Home</Link>
        <Link to="/create-post">Create Post</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default NavBar;
