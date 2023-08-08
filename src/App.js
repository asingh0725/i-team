import React, { useState, useEffect, useContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import NavBar from "./Navigation";
import CreatePost from "./CreatePost";
import "./App.css";
import Footer from "./Footer";
import About from "./About";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Feed from "./Feed";

import { AuthContext } from "./AuthContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isLoggedIn: currentUser && currentUser.emailVerified,
      }}
    >
      <Router>
        <div className={loading ? "app-fade-in" : "App"}>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/create-post"
                element={isLoggedIn ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/feed"
                element={isLoggedIn ? <Feed /> : <Navigate to="/login" />}
              />
              <Route path="/home" element={isLoggedIn ? <Feed /> : <Home />} />
              <Route path="/" element={isLoggedIn ? <Feed /> : <Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
