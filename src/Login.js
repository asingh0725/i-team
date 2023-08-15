import React, { useState, useContext } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Flex, Text, Image } from "@aws-amplify/ui-react";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const loggedUser = userCredential.user;

      if (!loggedUser.emailVerified) {
        alert("Please verify your email before logging in.");
      } else {
        // User is logged in and email is verified
        // Check if user exists in Firestore, if not, add them
        const userRef = doc(db, "users", loggedUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: loggedUser.email,
            uid: loggedUser.uid,
            timestamp: serverTimestamp(),
            profileImage: null,
          });
        }
        // Redirect after everything is done
        navigate("/home");
        //window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
      <Image
          src="../img/uw_logo.png"
          alt="uw_logo"
          height={["2.125rem", "3.125rem", "4.125rem"]}
          width={["2.125rem", "3.125rem", "4.125rem"]}
        />
        <h1 style={{ color: "#ffffff" }}>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="1rem">
            <Text color="#ffffff">
              <label htmlFor="email">Email:</label>
            </Text>
            <input
              style={{
                fontSize: "1.5rem",
                padding: "10px 15px",
              }}
              type="email"
              id="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <Text color="#ffffff">
              <label htmlFor="password">Password:</label>
            </Text>
            <input
              style={{
                fontSize: "1.5rem",
                padding: "10px 15px",
              }}
              type="password"
              id="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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
                transition: "background-color 0.3s ease",
              }}
            >
              Login
            </button>
          </Flex>
        </form>
        <Text color="#ffffff">
          <Link
            to="/register"
            style={{
              color: "#FFFFFF",
              textDecoration: "underline",
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
