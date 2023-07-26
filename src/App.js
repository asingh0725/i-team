import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from './Navigation';  // assuming Navigation.js is in the same directory
import CreatePost from './CreatePost';  // assuming CreatePost.js is in the same directory
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/create-post" element={<CreatePost />} />
          {/* Other routes go here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


