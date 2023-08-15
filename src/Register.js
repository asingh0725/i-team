import React, { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Flex, Loader, Text, Image } from "@aws-amplify/ui-react";

function Register() {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [stopGap, setStopGap] = useState(false);

  const handleSubmit = async (e) => {
    setStopGap(true);
    e.preventDefault();

    // Check if email address ends with "@uw.edu"
    if (!registerEmail.endsWith("@uw.edu")) {
      alert("Please use a valid @uw.edu email address.");
      return; // Exit the function to stop further execution
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const newUser = userCredential.user;
      auth.signOut();
      if (newUser) {
        await sendEmailVerification(newUser);
        alert(
          "Verification email sent. Please check your inbox and then login"
        );
        auth.signOut();
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (stopGap) {
    return <Loader variation="linear">Loading ....</Loader>;
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
      <Image
        src="../img/uw_logo.png"
        alt="uw_logo"
        height={["2.125rem", "3.125rem", "4.125rem"]}
        width={["2.125rem", "3.125rem", "4.125rem"]}
        />
        <h1 style={{ color: "#ffffff" }}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="1rem">
            <Text color="#ffffff">
              <label htmlFor="register-email">Email Address:</label>
            </Text>
            <input
              style={{
                fontSize: "1.5rem",
                padding: "10px 15px",
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
                padding: "10px 15px",
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
                transition: "background-color 0.3s ease",
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
              textDecoration: "underline",
            }}
          >
            Go to Login
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default Register;
