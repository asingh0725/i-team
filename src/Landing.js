import React from "react";
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import "./App.css";

const Landing = () => {
    return (
        <div className="landing">
            <NavBar />
            <main className="landing-content">
                <img src="img/husky.png" alt="Husky" className="husky-image" />
                <h1 className="welcoming-message">Welcome to Share-A-Bite</h1>
                <Link to="/login" className="login-button">Click Here to Log-In</Link>
            </main>
            <Footer />
        </div>
    );
}

export default Landing;