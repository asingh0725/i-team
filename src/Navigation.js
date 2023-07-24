import React from 'react';
import { Link } from 'react-router-dom';
import "App.css";

const NavBar = () => {
    return (
    <nav className="navbar">
        <div className="navbar__logo">
            <img src= "img/header_logo.png" alt="Logo" />
            <span>SHARE-A-BITE</span>
        </div>
        <div className="navbar__links">
            <Link to="/">Home</Link>
            <Link to="/create-post">Create Post</Link>
            <Link to="/about">About</Link>
        </div>
    </nav>
    );
}

export default NavBar;