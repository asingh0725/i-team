import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Assuming you have a separate CSS file for styling
import logo from './img_header.png'; // Assuming you placed your image in the same folder

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src={logo} alt="Logo" />
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