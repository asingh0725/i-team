import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; 
import { Navigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { Flex, Text } from '@aws-amplify/ui-react';

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState(null); // Initialized to null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if email address ends with "@uw.edu"
    if (!registerEmail.endsWith("@uw.edu")) {
      alert("Please use a valid @uw.edu email address.");
      return; // Exit the function to stop further execution
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const newUser = userCredential.user;
  
      if (newUser) {
        await sendEmailVerification(newUser);
        alert("Verification email sent. Please check your inbox.");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    // If there is a user, navigate them to the homepage. If there isn't, show them the registration form
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
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
            <h1 style={{ color: "#ffffff" }}>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="1rem">
                <Text color="#ffffff">
                  <label htmlFor="register-email">Email Address:</label>
                </Text>
                <input
                  style={{ 
                    fontSize: "1.5rem",
                    padding: "10px 15px"
                  }}
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <Text color="#ffffff">
                  <label htmlFor="register-password">Password:</label>
                </Text>
                <input
                  style={{ 
                    fontSize: "1.5rem",
                    padding: "10px 15px"
                  }}
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
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
                  Register
                </button>
              </Flex>
            </form>
            <Text color="#ffffff">
              <Link 
                to={`/login/`}
                style={{
                  color: "#FFFFFF",
                  textDecoration: "underline"
                }}
              >
                Go to Login
              </Link>
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default Register;