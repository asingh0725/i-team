import React, { useState, useContext } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { Flex, Text } from '@aws-amplify/ui-react';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const user = useContext(AuthContext);

  // New state variable
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const loggedUser = userCredential.user;

      if (!loggedUser.emailVerified) {
        alert("Please verify your email before logging in.");
      } else {
        // Force component re-render by toggling the state
        setForceUpdate(prev => !prev);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Updated if condition to check forceUpdate
  if ((user && user.emailVerified) || forceUpdate) {
    return <Navigate to="/create-post" />;
  }

  return (
    <Flex
      direction="column"
      height="100vh"
      backgroundColor="#4b2e83"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        padding="1.25rem"
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="1rem">
            <Text color="#ffffff">
              <label htmlFor="email">Email:</label>
            </Text>
            <input
              style={{
                fontSize: "1.5rem",
                padding: "10px 15px"}}
              type="email"
              id="email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              required
            />
  
            <Text color="#ffffff">
              <label htmlFor="password">Password:</label>
            </Text>
            <input
              style={{ 
                fontSize: "1.5rem",
                padding: "10px 15px" 
              }}
              type="password"
              id="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              required
            />
  
            <button 
              type="submit"
              style={{
                backgroundColor: "#c0c0c0",
                color: "#4b2e83",
                borderRadius: "1.25rem",
                padding: "0.625rem 1.25rem",
                textDecoration: "none",
                fontSize: "1.125rem",
                transition: "background-color 0.3s ease"
              }}
            >
              Login
            </button>
          </Flex>
        </form>
        <Text color="#ffffff">
          <Link to="/register" 
            style={{
              color: "#FFFFFF",
              textDecoration: "underline" 
            }}
          >
            Don't have an account? Register here.
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;