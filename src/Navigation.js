import React, { useContext, useEffect, useRef, useState } from "react";
import { Flex, Text, Button, useTheme, Image } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, storage, db } from "./firebase";
import { signOut } from "firebase/auth";

const NavBar = () => {
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

  const { dataLoaded, setDataLoaded } = useContext(AuthContext);

  useEffect(() => {
    if (userImgURL !== null) {
      setDataLoaded((prev) => ({ ...prev, navBar: true }));
    }
  }, [userImgURL]);

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

  if (!dataLoaded.navBar || !dataLoaded.feed) {
    return null;
  }
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="1.25rem"
      backgroundColor="#c0c0c0"
      height="4.125rem" // Set a specific height for the navbar
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
          <img
            src="img/header_logo.png"
            alt="Logo"
            style={{ height: "4.125rem", marginRight: "0.625rem" }}
          />
          <Text color="#fff" fontSize="1.5rem" fontWeight="bold">
            SHARE-A-BITE
          </Text>
        </Link>
      </Flex>
      <Flex direction="row" gap="1.25rem" style={{ fontSize: "1.25rem" }}>
        {/* If users get verified, they can access "Create Post" and "About";
            If users get inverified, they can't access Create Post, but "Home" and "About" */}
        {isLoggedIn ? (
          <Flex direction={"row"} alignItems={"center"}>
            <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/create-post"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Create Post
            </Link>
            <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
              About
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
              onClick={handleUploadClick}
            >
              <Image
                borderRadius="50%"
                src={
                  isLoading
                    ? "img/header_logo.png"
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
            >
              Log Out
            </Button>
          </Flex>
        ) : (
          <>
            <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>
              About
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
