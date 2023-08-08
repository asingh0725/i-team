import React, { useState, useEffect, useRef, useContext } from "react";
import locations from "./data/locations.json";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "@firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { db, storage } from "./firebase";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  useTheme,
  Card,
  Image,
  Button,
  TextAreaField,
  Text,
  Autocomplete,
} from "@aws-amplify/ui-react";
import { FaLocationDot } from "react-icons/fa6";
import "@aws-amplify/ui-react/styles.css";
import { AuthContext } from "./AuthContext";

function CreatePost() {
  const { tokens } = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const fetchUserDetails = async (uid) => {
    const userRef = doc(db, "users", uid);
    try {
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        console.error("User not found in the database!");
        return null;
      }

      return userSnapshot.data();
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  //Add location
  const [location, setLocation] = useState(null);
  const [value, setValue] = React.useState("");
  const onSelect = (option) => {
    const { label } = option;
    setLocation(label);
    setValue(label);
  };
  const onClear = () => {
    setValue("");
    setLocation(null);
  };

  //Upload Image
  const [hasAttemptedUpload, setHasAttemptedUpload] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
    setHasAttemptedUpload(true);
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    console.log("Files =", files);
    for (let i = 0; i < files.length; i++) {
      const storageRef = ref(storage, "images/" + files[i].name);
      const uploadTask = uploadBytesResumable(storageRef, files[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageArray((imageArray) => [...imageArray, downloadURL]);
          });
        }
      );
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
  const handlePost = async () => {
    const userDetails = await fetchUserDetails(user.uid);
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
      console.log("Posting: ", { location, imageArray, caption });
      addDoc(collection(db, "posts"), {
        location: location,
        imageArray: imageArray,
        caption: caption,
        timestamp: serverTimestamp(),
        uid: user.uid, // the user's UID
      }).catch((error) => {
        alert(error.message);
      });
      //addPost({ location, imageArray, caption });
      navigate("/home");
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
      direction="row"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      padding={["1.5rem", "1.75rem", "3rem"]}
    >
      <Flex
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        alignContent="center"
        wrap="nowrap"
        gap="2rem"
        padding={["1.5rem", "1.75rem", "3rem"]}
        width={"55rem"}
      >
        <Flex
          direction={"row"}
          justifyContent={"flex-start"}
          alignContent="center"
          alignItems={"center"}
          width={"100%"}
        >
          <FaLocationDot size={24}></FaLocationDot>
          <Autocomplete
            fontSize={["1.25rem", "1.5rem", "1.75rem"]}
            style={{ borderWidth: 0 }}
            label="Locations across UW campus"
            backgroundColor={tokens.colors.white}
            borderColor={"white"}
            borderRadius={tokens.radii.large}
            placeholder="Select Pick-up location"
            onChange={(e) => {
              setLocation(e.target.value);
              setValue(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                location: e.target.value ? null : "Location is required",
              }));
            }}
            options={locations}
            value={value}
            onClear={onClear}
            onSelect={onSelect}
          ></Autocomplete>
          {errors.location && (
            <Text
              variation="error"
              as="em"
              fontSize={["1.25rem", "1.5rem", "1.75rem"]}
              color={tokens.colors.white}
            >
              {errors.location}
            </Text>
          )}
        </Flex>
        <Card
          variation="outlined"
          borderRadius={tokens.radii.large}
          width={"100%"}
        >
          <Flex direction={"column"} alignItems={"center"} width={"100%"}>
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
              size="small"
              borderRadius={tokens.radii.medium}
              onClick={handleUploadClick}
              height={["2.725rem", "3.125rem","4.125rem"]}
              width={["4.125rem", "5.725rem","6.125rem"]}
              fontSize={["0.45rem", "0.7rem","1rem"]}
            >
              Upload now
            </Button>
            {hasAttemptedUpload && errors.image && (
              <Text
                variation="error"
                as="em"
                fontSize={["0.3rem", "0.7rem","1rem"]}
                color={tokens.colors.purple}
              >
                {errors.image}
              </Text>
            )}
          </Flex>
        </Card>
        <TextAreaField
          backgroundColor={tokens.colors.white}
          borderColor={"white"}
          style={{ borderWidth: 0 }}
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
          width={"100%"}
        />
        {errors.caption && (
          <Text
            variation="error"
            as="em"
            fontSize={["1.25rem", "1.35rem", "1.5em"]}
            color={tokens.colors.white}
          >
            {errors.caption}
          </Text>
        )}
        <Flex direction="row-reverse" alignItems="flex-end" width={"100%"}>
          <Button
          borderRadius={tokens.radii.medium}
          variation="primary"
          onClick={handlePost}
          height={["1.725rem", "2.125rem","3.125rem"]}
          width={["3.125rem", "3.725rem","4.125rem"]}
          fontSize={["0.45rem", "0.7rem","1rem"]}
          >
            Post
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default CreatePost;
