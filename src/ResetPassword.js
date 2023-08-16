import React, { useState } from "react";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Text, Image } from "@aws-amplify/ui-react";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent to your email. Please check and follow the instructions to reset your password.");
    } catch (error) {
      setMessage(error.message);
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
        <h1 style={{ color: "#ffffff" }}>Reset Password</h1>
        {message && <Text color="#ffffff">{message}</Text>}
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="1rem">
            <Text color="#ffffff">
              <label htmlFor="email">Email Address:</label>
            </Text>
            <input
              style={{
                fontSize: "1.5rem",
                padding: "10px 15px",
              }}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Send Reset Link
            </button>
          </Flex>
        </form>
        <Text color="#ffffff">
          <Link
            to="/login"
            style={{
              color: "#FFFFFF",
              textDecoration: "underline",
            }}
          >
            Go back to Login
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default ResetPassword;
