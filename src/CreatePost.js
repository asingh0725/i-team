import React, { useState, useEffect, useRef } from "react";
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

  //Add location
  const locations = ["Kane 220", "MGH 430", "Denny 374"];
  const locationOption = locations.map((location) => {
    return <option value={location}>{location}</option>;
  });

  //Upload Image
  const [initialImage, updateUploadedImage] = useState("/img/upload_image.png");
  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    updateUploadedImage(URL.createObjectURL(file));
  };

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
      <Card variation="outlined" borderRadius={tokens.radii.large}>
        <Flex direction={"column"} alignItems={"center"}>
          <Image src={initialImage} />
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
          <Button
            variation="primary"
            size="large"
            borderRadius={tokens.radii.large}
            onClick={handleUploadClick}
          >
            Upload now
          </Button>
        </Flex>
      </Card>
      <TextField
        descriptiveText=""
        outline
        placeholder="write a caption.."
        label=""
        errorMessage=""
        borderRadius={tokens.radii.large}
        isRequired={true}
      />
      <Flex direction="row-reverse" alignItems="flex-end">
        <Button variation="primary">Post</Button>
      </Flex>
    </Flex>
  );
}
export default CreatePost;
