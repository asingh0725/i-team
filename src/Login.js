import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/create-post");
  };
  return (
    <div className="login">
      <main className="login-content">
        <h2>Login</h2>
        {/* This is a temporary form! We will embed the UW IT's API in
        this section in sprint 2. For now, when the user click's on sign in
        regardless of the input value(value is required though), it will redirect
        users to the create post page. */}
        <form>
          <label htmlFor="netID">
            Net ID
            <input type="text" id="netID" name="netID" required />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" id="password" name="password" required />
          </label>
          <button type="submit" onClick={handleSignIn}>
            Sign In
          </button>
        </form>
        <Link to="/home" className="back-button">
          Go back to Home
        </Link>
      </main>
    </div>
  );
};

export default Login;
