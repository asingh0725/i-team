import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Navigation"; // assuming Navigation.js is in the same directory
import CreatePost from "./CreatePost"; // assuming CreatePost.js is in the same directory
import "./App.css";
import Footer from "./Footer";
import About from "./About";
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
