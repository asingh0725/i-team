import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Image } from "@aws-amplify/ui-react";

const Home = () => {
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
          src="img/husky.png"
          alt="Husky"
          maxWidth="100%"
          height="auto"
          marginBottom="1.25rem"
        />
        <Text
          color="#ffffff"
          fontFamily='"Encode Sans-Regular", Helvetica'
          fontSize="3.125rem"
          fontWeight="400"
          letterSpacing="0.125rem"
          marginBottom="1.25rem"
        >
          Welcome to Share-A-Bite
        </Text>
        <Link
          to="/login"
          className="login-button"
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
          Click Here to Log-In
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
