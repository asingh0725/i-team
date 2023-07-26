import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Home = () => {
  return (
    <div className="landing">
      <main className="landing-content">
        <img src="img/husky.png" alt="Husky" className="husky-image" />
        <h1 className="welcoming-message">Welcome to Share-A-Bite</h1>
        <Link to="/login" className="login-button">
          Click Here to Log-In
        </Link>
      </main>
    </div>
  );
};

export default Home;
