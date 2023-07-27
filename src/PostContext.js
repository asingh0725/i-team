import React, { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    console.log("Adding post: ", post); // debug statement
    console.log("Current posts: ", posts); // debug statement
    setPosts((currentPosts) => [...currentPosts, post]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
