import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Flex,
  Text,
  Button,
  useTheme,
  Image,
  Link as AmplifyLink,
} from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, storage, db } from "./firebase";
import { signOut } from "firebase/auth";

const NavBarNotLoggedIn = () => {
  // Use the AuthContext to get the current user
  const { tokens } = useTheme();

  return (
    <Flex
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    padding="1.25rem"
    backgroundColor="#c0c0c0"
    height={["2.125rem","3.125rem","4.125rem"]} // the responsiveness for the mobile, tablet, and desktop
    >
      <Flex alignItems="center">
        <Link
          to="/home"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Image
            src="img/header_logo.png"
            alt="Logo"
            style={{marginRight: "0.625rem"}}
            height={["2.125rem","3.125rem","4.125rem"]}
          />
          <Text
          color="#fff"
          fontSize={['1.2rem', '1.4rem', '1.6rem', '1.8rem', '2rem']}
          fontWeight="bold"
          >
            SHARE-A-BITE
          </Text>
        </Link>
      </Flex>
      <Flex 
        direction="row"
        gap="1.25rem"
      >
        <>
          <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>
          <Text
          color="#fff"
          fontSize={['1rem', '1.4rem', '1.6rem', '1.8rem', '2rem']}
          >
            Home
          </Text>
          </Link>
          <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
          <Text
          color="#fff"
          fontSize={['1rem', '1.4rem', '1.6rem', '1.8rem', '2rem']}
          >
            About
          </Text>
          </Link>
        </>
      </Flex>
    </Flex>
  );
};

const NavBarLoggedIn = () => {
  // Use the AuthContext to get the current user
  const { tokens } = useTheme();
  const fileInput = useRef();
  const { user, isLoggedIn, forceUpdate } = useContext(AuthContext);
  const [userImgURL, setUserImgURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/home"); // Redirect to home page after logging out
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  // const { dataLoaded, setDataLoaded } = useContext(AuthContext);

  // useEffect(() => {
  //   if (userImgURL !== null) {
  //     setDataLoaded((prev) => ({ ...prev, navBar: true }));
  //   }
  // }, [userImgURL]);

  useEffect(() => {
    const fetchUserImage = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().profileImage) {
          setUserImgURL(userDoc.data().profileImage);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    fetchUserImage();
  }, [user]);
  const handleFileChange = async (event) => {
    const file = event.target.files;
    console.log("File = ", file[0]);
    const storageRef = ref(storage, "images/" + file[0].name);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUserImgURL(downloadURL); // Update state here
          const userRef = doc(db, "users", user.uid);
          setDoc(userRef, { profileImage: downloadURL }, { merge: true });
        });
      }
    );
  };

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="1.25rem"
      backgroundColor="#c0c0c0"
      height={["2.125rem","3.125rem","4.125rem"]}
    >
      <Flex alignItems="center">
        <Link
          to="/home"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Image
            src="img/header_logo.png"
            alt="Logo"
            style={{marginRight: "0.625rem"}}
            height={["2.125rem","3.125rem","4.125rem"]}
          />
          <Text
          color="#fff"
          fontSize={['0.5rem', '1.2rem', '1.4rem']}
          fontWeight="bold"
          >
            SHARE-A-BITE
          </Text>
        </Link>
      </Flex>
      <Flex direction="row" gap="1.25rem">
        <Flex direction={"row"} alignItems={"center"} >
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
          >
          <Text
          color="#fff"
          fontSize={['0.5rem', '1.2rem', '1.4rem', '1.6rem', '1.8rem', '2rem']}
          >
            Home
          </Text>
          </Link>
          <Link
            to="/create-post"
            style={{ textDecoration: "none" }}
          >
          <Text
          color="#fff"
          fontSize={['0.5rem', '1.2rem', '1.4rem', '1.6rem', '1.8rem', '2rem']}
          >
            Create Post
          </Text>
          </Link>
          <Link
            to="/about"
            style={{ textDecoration: "none" }}
          >
          <Text
          color="#fff"
          fontSize={['0.5rem', '1.2rem', '1.4rem', '1.6rem', '1.8rem', '2rem']}
          >
            About
          </Text>
          </Link>
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <Button
            backgroundColor={tokens.colors.transparent}
            borderRadius={"50%"}
            height={["2.125rem", "2.125rem","3.125rem"]}
            onClick={handleUploadClick}
            padding={"0.3rem"}
          >
            <Image
              borderRadius={"50%"}
              height={["100%"]}
              src={
                isLoading
                  ? "img/sample_user.png"
                  : userImgURL
                  ? userImgURL
                  : "img/sample_user.png"
              }
            />
          </Button>
          <Button
            variation="warning"
            justifyContent={"center"}
            onClick={handleLogout}
            height={["1.725rem", "2.125rem","3.125rem"]}
            width={["3.125rem", "3.725rem","4.125rem"]}
            fontSize={["0.65rem", "0.7rem","1rem"]}
          >
            Log Out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export { NavBarLoggedIn, NavBarNotLoggedIn };