import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import NavBar from './Navigation';
import CreatePost from './CreatePost';
import './App.css';
import Footer from './Footer';
import About from './About';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Feed from './Feed';

import { AuthContext } from './AuthContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
        console.log('User authenticated:', user);
    } else {
        setCurrentUser(null);
        console.log('User not authenticated.');
    }
    
    }
    );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;