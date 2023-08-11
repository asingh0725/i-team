import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
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

  useEffect(() => {
    const fetchUserDetails = async (uid) => {
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);
      return userSnapshot.exists() ? userSnapshot.data() : null;
    };

    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const uidSet = new Set(postSnapshot.docs.map((doc) => doc.data().uid));
      const userDetailsMap = {};

      for (let uid of uidSet) {
        const userDetails = await fetchUserDetails(uid);
        userDetailsMap[uid] = userDetails;
      }

      const postList = postSnapshot.docs.map((doc) => {
        const postData = doc.data();
        return { ...postData, user: userDetailsMap[postData.uid] };
      });
      setUserMap(userDetailsMap);
      setPosts(postList);
    };

    fetchPosts();

    const fetchComments = async () => {
      const commentsCollection = collection(db, "comments");
      const commentsSnapshot = await getDocs(commentsCollection);
      const commentsData = {};

      commentsSnapshot.docs.forEach((doc) => {
        const commentData = doc.data();
        if (!commentsData[commentData.postId]) {
          commentsData[commentData.postId] = [];
        }
        commentsData[commentData.postId].push(commentData);
      });

      setComments(commentsData);
    };

    fetchComments();
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
                  <Route path="/home" element={<Feed posts={posts} />} />
                  {posts.length > 0 && userMap && comments !== null ? ( // Add this condition
                    <Route
                      path="/home/:postId"
                      element={
                        <PostPage
                          posts={posts}
                          userMap={userMap}
                          comments={comments}
                        />
                      }
                    />
                  ) : null}
                  <Route path="/" element={<Feed posts={posts} />} />
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
