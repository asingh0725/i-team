import React from "react";
import NavBar from './Navigation';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import "./App.css";

const Login = () => {
    return (
        <div className="login">
            <NavBar />
            <main className="login-content">
                <h2>Login</h2>
                /* This is a temporary form! 
                We are supposed to embed the UW IT's API in this section in sprint 2" */
                <form>
                    <label htmlFor="netID">
                        Net ID
                        <input type="text" id="netID" name="netID" required />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input type="password" id="password" name="password" required />
                    </label>
                    <button type="submit">Sign In</button>
                </form>
                <Link to="/landing" className="back-button">Go back to Home</Link>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
