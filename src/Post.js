import React, { useState } from "react";
import {
  doc,
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
} from "@firebase/firestore";
import { db } from "./firebase";
import {
  Flex,
  useTheme,
  Card,
  Image as AmplifyImage,
  Text,
  Button,
  ScrollView,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaLocationDot } from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export function Post({
  post,
  handleDetails,
  showButton,
  userProfileImage,
  currentUser,
}) {
  const { tokens } = useTheme();
  const profileImageSrc = userProfileImage || "./img/sample_user.png";
  const [promptConfirmDelete, setPromptOnConfirmDelete] = useState(false);

  if (!post) {
    return <div>Error: Post data is not available.</div>;
  }

  const arrowStyles = {
    position: "absolute",
    zIndex: 3,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
    backgroundColor: "#FFD700",
    borderRadius: "50%",
  };

  const handleDeletePostConfirmation = () => {
    setPromptOnConfirmDelete(true);
  };

  const deletePost = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
  };

  const deletePostComments = async (postId) => {
    console.log("Attempting to delete comments for post:", postId);
    const commentsRef = collection(db, "comments");
    const queryRef = query(commentsRef, where("postId", "==", postId));
    console.log("comment Ref", commentsRef);
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach(async (documentSnapshot) => {
      await deleteDoc(documentSnapshot.ref);
    });
    console.log("Comments deleted successfully for post:", postId);
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      await deletePostComments(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Card
      justifyContent="center"
      alignItems="center"
      variation="default"
      backgroundColor={tokens.colors.transparent}
      width="100%"
      height="50%"
      key={post.id}
    >
      <Flex direction={{ base: "column", large: "row" }}>
        <Flex width={{ base: "100%", large: "20%" }} justifyContent="center">
          <AmplifyImage
            objectFit="cover"
            height={["2.125rem", "5.125rem", "6rem"]}
            width={["2.125rem", "5.125rem", "6rem"]}
            src={profileImageSrc}
            borderRadius={"50%"}
          />
        </Flex>
        <Flex
          direction="column"
          width={{ base: "100%", large: "80%" }}
          marginLeft={{ base: "0", large: "20px" }}
          marginTop={{ base: "10px", large: "0" }}
        >
          <Flex direction="row" alignItems="center">
            <FaLocationDot size={24} color="white" />
            <Text
              color={tokens.colors.white}
              fontSize={["1.15rem", "1.2rem", "1.25em"]}
            >
              {post.location}
            </Text>
          </Flex>
          <Carousel
            width="100%"
            height="auto"
            renderArrowPrev={(clickHandler, hasNext, label) =>
              hasNext && (
                <div
                  style={{ ...arrowStyles, left: 15 }}
                  onClick={clickHandler}
                  title={label}
                />
              )
            }
            renderArrowNext={(clickHandler, hasNext, label) =>
              hasNext && (
                <div
                  style={{ ...arrowStyles, right: 15 }}
                  onClick={clickHandler}
                  title={label}
                />
              )
            }
            renderIndicator={(onClickHandler, isSelected, index, label) => (
              <li
                style={{
                  display: "none",
                }}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
              />
            )}
          >
            {post.imageArray.map((image, index) => (
              <div key={index}>
                <ScrollView
                  maxHeight={"300px"}
                  maxWidth={"100%"}
                  height={"auto"}
                >
                  <AmplifyImage
                    src={image}
                    borderRadius={tokens.radii.large}
                    height={"300px"}
                    width={"100%"}
                  />
                </ScrollView>
              </div>
            ))}
          </Carousel>
          <Text
            color={tokens.colors.white}
            alignSelf="flex-start"
            fontSize={["0.8rem", "1.15rem", "1.2em"]}
          >
            {post.caption}
          </Text>
          {showButton && (
            <Flex justifyContent={"flex-end"}>
              <Button backgroundColor={"gold"} onClick={handleDetails}>
                Comments
              </Button>
              {showButton && currentUser.uid === post.uid && (
                <>
                  <Flex direction={"row"} justifyContent={"flex-end"}>
                    {!promptConfirmDelete ? (
                      <Button
                        variation="destructive"
                        onClick={handleDeletePostConfirmation}
                      >
                        Delete Post
                      </Button>
                    ) : (
                      <>
                        <Button
                          variation="primary"
                          onClick={() => {
                            handleDeletePost(post.id);
                            setPromptOnConfirmDelete(false);
                          }}
                        >
                          Confirm Delete
                        </Button>
                        <Button
                          variation="warning"
                          onClick={() => setPromptOnConfirmDelete(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Flex>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
