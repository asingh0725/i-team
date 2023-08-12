import React from "react";
import { Flex, Text } from "@aws-amplify/ui-react";

const Footer = () => {
  return (
    <Flex
      height={["2.125rem", "3.125rem", "4.125rem"]}
      textAlign="center"
      padding={"1.8rem"}
      direction="column"
      alignItems="center"
      backgroundColor="#c0c0c0"
      justifyContent="center"
      style={{ textAlign: "center", marginBottom: "0", marginTop: "0" }}
    >
      <Text
        fontSize={["0.55rem", "0.7rem", "0.8rem", "1rem"]}
        color="#333"
        style={{ margin: "0" }}
      >
        © 2023 Share-A-Bite All Rights Reserved.
      </Text>
      <Text
        fontSize={["0.55rem", "0.7rem", "0.8rem", "1rem"]}
        color="#333"
        style={{ margin: "0" }}
      >
        Created by Jennifer Morales, Mustafa Abdulkadir, Ryotaro Hayashi, Aviraj
        Singh
      </Text>
    </Flex>
  );
};

export default Footer;
