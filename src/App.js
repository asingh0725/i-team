import React, { useState, useEffect, useContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { NavBarLoggedIn, NavBarNotLoggedIn } from "./Navigation";
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
  const [dataLoaded, setDataLoaded] = useState({ navBar: false, feed: false });

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
        dataLoaded,
        setDataLoaded,
      }}
    >
      <Router>
        <div className={loading ? "app-fade-in" : "App"}>
          {!isLoggedIn ? (
            <>
              <NavBarNotLoggedIn />
              <div className="container">
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </div>
            </>
          ) : (
            <>
              <NavBarLoggedIn />
              <div className="container">
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/create-post" element={<CreatePost />} />
                  <Route path="/home" element={<Feed />} />
                  <Route path="/" element={<Feed />} />
                </Routes>
              </div>
            </>
          )}
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
