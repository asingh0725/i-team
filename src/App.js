import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { NavBarLoggedIn, NavBarNotLoggedIn } from "./Navigation";
import CreatePost from "./CreatePost";
import "./App.css";
import Footer from "./Footer";
import About from "./About";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { Feed } from "./Feed";
import { PostPage } from "./PostPage";
import { AuthContext } from "./AuthContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    const postsCollection = collection(db, "posts");
    const unsubscribePosts = onSnapshot(postsCollection, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(updatedPosts);
    });

    const usersCollection = collection(db, "users");
    const unsubscribeUsers = onSnapshot(usersCollection, (snapshot) => {
      const userDetailsMap = {};

      snapshot.docs.forEach((doc) => {
        const userData = doc.data();
        userDetailsMap[doc.id] = userData;
      });

      setUserMap(userDetailsMap);
    });

    const commentsCollection = collection(db, "comments");
    const unsubscribeComments = onSnapshot(commentsCollection, (snapshot) => {
      const commentsData = {};

      snapshot.docs.forEach((doc) => {
        const commentData = doc.data();
        if (!commentsData[commentData.postId]) {
          commentsData[commentData.postId] = [];
        }
        commentsData[commentData.postId].push(commentData);
      });

      setComments(commentsData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
      unsubscribeUsers();
      unsubscribeComments();
    };
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
                  {posts.length > 0 && userMap && comments !== null && (
                    <Route
                      path="/home/:postId"
                      element={
                        <PostPage
                          posts={posts}
                          userMap={userMap}
                          comments={comments}
                          currentUser={currentUser}
                          updateUserMap={(updatedMap) => setUserMap(updatedMap)}
                        />
                      }
                    />
                  )}
                  <Route
                    path="/home"
                    element={<Feed posts={posts} userMap={userMap} />}
                  />
                  <Route
                    path="/"
                    element={<Feed posts={posts} userMap={userMap} />}
                  />
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
