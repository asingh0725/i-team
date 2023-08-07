import React, { useContext, useState, useEffect } from "react";
import { Flex, Text, Button } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const NavBar = () => {
  // Use the AuthContext to get the current user
  const { user, isLoggedIn, forceUpdate } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/home"); // Redirect to home page after logging out
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="1.25rem"
      backgroundColor="#c0c0c0"
      height="4.125rem" // Set a specific height for the navbar
    >
      <Flex alignItems="center">
        <Link
          to="/home"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="img/header_logo.png"
            alt="Logo"
            style={{ height: "4.125rem", marginRight: "0.625rem" }}
          />
          <Text color="#fff" fontSize="1.5rem" fontWeight="bold">
            SHARE-A-BITE
          </Text>
        </Link>
      </Flex>
      <Flex direction="row" gap="1.25rem" style={{ fontSize: "1.25rem" }}>
        {/* If users get verified, they can access "Create Post" and "About";
            If users get inverified, they can't access Create Post, but "Home" and "About" */}
        {isLoggedIn ? (
          <Flex direction={"row"} alignItems={"center"}>
            <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/create-post"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Create Post
            </Link>
            <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
              About
            </Link>
            <Button
              variation="warning"
              justifyContent={"center"}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Flex>
        ) : (
          <>
            <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
              About
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
