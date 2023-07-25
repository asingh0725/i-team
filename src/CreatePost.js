import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  useTheme,
  SelectField,
  Card,
  Image,
  Button,
  TextField,
  Text,
} from "@aws-amplify/ui-react";
import { FaLocationDot } from "react-icons/fa6";
import "@aws-amplify/ui-react/styles.css";

function CreatePost() {
  const { tokens } = useTheme();

  //Add location
  const [location, setLocation] = useState(null);
  const locations = ["Kane 220", "MGH 430", "Denny 374"];
  const locationOption = locations.map((location) => {
    return <option value={location}>{location}</option>;
  });

  //Upload Image
  const [hasAttemptedUpload, setHasAttemptedUpload] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
    setHasAttemptedUpload(true);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log("Files =", files);
    for (let i = 0; i < files.length; i++) {
      const img = URL.createObjectURL(files[i]);
      console.log("IMG url = ", img);
      setImageArray((imageArray) => [...imageArray, img]);
    }
    event.target.value = null;
  };

  const imgComponent = imageArray.map((img, index) => {
    return (
      <Flex direction={"row"} justifyContent={"center"} alignContent={"center"}>
        <Image src={img} width={"75%"} />
        <Button
          variation="warning"
          width={"2%"}
          height={"2%"}
          onClick={() => removeImage(index)}
        >
          X
        </Button>
      </Flex>
    );
  });

  const removeImage = (index) => {
    setImageArray((prevImages) => {
      return prevImages.filter((img, i) => i !== index);
    });
  };

  //Add caption
  const [caption, setCaption] = useState(null);

  //Post button
  const [errors, setErrors] = useState({});
  const handlePost = () => {
    // Check if all fields are filled out
    if (!location || imageArray.length === 0 || !caption) {
      // Set error messages
      setErrors({
        location: !location ? "Location is required!" : null,
        image:
          imageArray.length === 0 ? "At least one image is required" : null,
        caption: !caption ? "Caption is required" : null,
      });
    } else {
      // clear errors and post
      setErrors({});
      // post code here
    }
  };

  // Check if there are any images
  useEffect(() => {
    if (imageArray.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "At least one image is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: null,
      }));
    }
  }, [imageArray]);

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
          onChange={(e) => {
            setLocation(e.target.value);
            setErrors((prevErrors) => ({
              ...prevErrors,
              location: e.target.value ? null : "Location is required",
            }));
          }}
        >
          {locationOption}
        </SelectField>
        {errors.location && (
          <Text variation="error" as="em" fontSize={"1.5em"}>
            {errors.location}
          </Text>
        )}
      </Flex>
      <Card variation="outlined" borderRadius={tokens.radii.large}>
        <Flex direction={"column"} alignItems={"center"}>
          {imageArray.length === 0 ? (
            <Image src="/img/upload_image.png" />
          ) : (
            imgComponent
          )}

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
          {hasAttemptedUpload && errors.image && (
            <Text variation="error" as="em" fontSize={"1.5em"}>
              {errors.image}
            </Text>
          )}
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
        onChange={(e) => {
          setCaption(e.target.value);
          setErrors((prevErrors) => ({
            ...prevErrors,
            caption: e.target.value ? null : "Caption is required",
          }));
        }}
        width={"50%"}
      />
      {errors.caption && (
        <Text variation="error" as="em" fontSize={"1.5em"}>
          {errors.caption}
        </Text>
      )}
      <Flex direction="row-reverse" alignItems="flex-end">
        <Button variation="primary" onClick={handlePost}>
          Post
        </Button>
      </Flex>
    </Flex>
  );
}
export default CreatePost;
