import React, { useState, useEffect } from "react";
import {
  Flex,
  useTheme,
  SelectField,
  Card,
  Image,
  Button,
  TextField,
} from "@aws-amplify/ui-react";
import { FaLocationDot } from "react-icons/fa6";
import "@aws-amplify/ui-react/styles.css";

function CreatePost() {
  const { tokens } = useTheme();

  const locations = ["Kane 220", "MGH 430", "Denny 374"];
  const locationOption = locations.map((location) => {
    return <option value={location}>{location}</option>;
  });

  return (
    <Flex
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      alignContent="center"
      wrap="nowrap"
      gap="2rem"
      padding={"3rem"}
    >
      <Flex direction={"row"} alignItems={"center"}>
        <FaLocationDot size={24}></FaLocationDot>
        <SelectField
          label=""
          descriptiveText=""
          borderRadius={tokens.radii.large}
          placeholder="Select Pick-up location"
          isRequired={true}
        >
          {locationOption}
        </SelectField>
      </Flex>
    </Flex>
  );
}
export default CreatePost;
