import React from "react";
import { Flex, Text } from "@aws-amplify/ui-react";

const About = () => {
  return (
    <Flex
      direction="column"
      minHeight="100vh"
      padding="2rem"
      backgroundColor="#4b2e83"
      color="white"
    >
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        flexGrow={1}
        fontFamily="Encode Sans"
      >
        <Text
          as="h1"
          textAlign="center"
          fontSize="2rem"
          marginBottom="1rem"
        >
          About Us
        </Text>

        <Flex direction="column" marginBottom="2rem">
          <Text
            as="h2"
            textAlign="left"
            fontSize="2rem"
            marginBottom="1rem"
          >
            Why Share-A-Bite?
          </Text>
          <Text
            as="p"
            textAlign="left"
            fontSize="1.2rem"
            lineHeight="1.6"
            marginBottom="2rem"
            width="60%"
          >
            Share-A-Bite is a platform that enables clubs and organizations to
            share information about their surplus food with hungry students at
            the University of Washington Seattle. By facilitating this exchange,
            Share-A-Bite not only helps address food insecurity among students
            but also contributes to the reduction of food waste.
          </Text>
        </Flex>

        <Flex direction="column" marginBottom="2rem">
          <Text
            as="h2"
            textAlign="left"
            fontSize="2rem"
            marginBottom="1rem"
          >
            How do I use it?
          </Text>
          <Text
            as="p"
            textAlign="left"
            fontSize="1.2rem"
            lineHeight="1.6"
            marginBottom="2rem"
            width="60%"
          >
            1. Log in using your UW netID <br />
            2. After logging in with your UW netID, you will gain access to
            Share-A-Bite's feed, which is filled with posts about available food
            options <br />
            3. To create a post, simply click on the "create post" button and
            provide all the necessary information as prompted <br />
            4. All posts get deleted after 24hrs
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default About;