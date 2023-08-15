import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Post } from "./Post";
import {
  Flex,
  Text,
  TextAreaField,
  Button,
  Image,
  Heading,
  Loader,
  Card,
  View,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  getDoc,
  deleteDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "./firebase";

export function PostPage({
  posts,
  userMap,
  comments,
  currentUser,
  updateUserMap,
}) {
  const { tokens } = useTheme();
  const { postId } = useParams();
  const post = posts.find((post) => post.id === postId);
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState(comments[postId] || []);
  const sortedPostComments = [...postComments].sort(
    (a, b) => b.timestamp - a.timestamp
  );
  const [commentError, setCommentError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentEdited, setCommentEdited] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    console.log("Comments state changed:", comments);
  }, [comments]);

  useEffect(() => {
    const fetchUserProfileImage = async () => {
      try {
        // Fetching the profile image for the current user
        const userRefForCurrentUser = doc(db, "users", currentUser.uid);
        const userDetailsForCurrentUser = await getDoc(userRefForCurrentUser);

        if (userDetailsForCurrentUser.exists()) {
          const userDataForCurrentUser = userDetailsForCurrentUser.data();
          if (userDataForCurrentUser.profileImage) {
            const updatedUserMapForCurrentUser = {
              ...userMap,
              [currentUser.uid]: {
                ...userMap[currentUser.uid],
                profileImage: userDataForCurrentUser.profileImage,
              },
            };
            updateUserMap(updatedUserMapForCurrentUser);
          }
        }

        // Fetching profile images for commenters
        for (const comment of postComments) {
          if (!userMap[comment.uid]?.profileImage) {
            const userRefForCommenter = doc(db, "users", comment.uid);
            const userDetailsForCommenter = await getDoc(userRefForCommenter);

            if (userDetailsForCommenter.exists()) {
              const userDataForCommenter = userDetailsForCommenter.data();
              if (userDataForCommenter.profileImage) {
                const updatedUserMapForCommenter = {
                  ...userMap,
                  [comment.uid]: {
                    ...userMap[comment.uid],
                    profileImage: userDataForCommenter.profileImage,
                  },
                };
                updateUserMap(updatedUserMapForCommenter);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserProfileImage();
  }, [currentUser.uid, db, userMap, updateUserMap, postComments]);

  const handleCommentSubmit = async () => {
    if (comment.trim() !== "") {
      const newComment = {
        content: comment,
        postId: postId,
        uid: currentUser.uid,
        //profileImage: userMap[currentUser.uid]?.profileImage || "",
      };

      try {
        const commentDocRef = await addDoc(collection(db, "comments"), {
          ...newComment,
          timestamp: serverTimestamp(),
        });

        setPostComments((prevComments) => [
          ...prevComments,
          { ...newComment, id: commentDocRef.id },
        ]);
        setComment("");
        setCommentError(false);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    } else {
      setCommentError(true);
    }
  };

  const handleCommentTyping = () => {
    if (commentError) {
      setCommentError(false);
    }
  };

  if (!post || !userMap || !comments) {
    return <Loader variation="linear" />;
  }

  const handleUpdateComment = async (commentId, newContent) => {
    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, { content: newContent });

    setPostComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, content: newContent } : comment
      )
    );

    // Exit editing mode and clear editedContent
    setCommentEdited(null);
    setEditedContent("");
  };

  const deleteComment = async (commentId) => {
    const commentRef = doc(db, "comments", commentId);
    await deleteDoc(commentRef);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setPostComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Flex
      direction={{ base: "column", large: "row" }}
      justifyContent="center"
      alignItems="center"
      wrap="wrap"
      gap="2rem"
      padding="3rem"
      minHeight="100vh"
      width="100%"
    >
      <View
        width={{ base: "100%", large: "50%" }}
        padding="1rem"
        borderRadius="6px"
        border="1px solid var(--amplify-colors-black)"
        boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
      >
        <Post
          post={post}
          showButton={false}
          userMap={userMap}
          userProfileImage={userMap[post.uid]?.profileImage}
        />
      </View>
      <Flex
        direction="column"
        width={{ base: "100%", large: "50%" }}
        gap="2rem"
      >
        {comments[postId] &&
          comments[postId].map((comment, index) => (
            <View
              key={index}
              backgroundColor="var(--amplify-colors-transparent)"
              borderRadius="6px"
              border="1px solid var(--amplify-colors-black)"
              boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
              padding="1rem"
              maxWidth="100%"
            >
              <Flex direction="row" gap="0.5rem" alignItems="center">
                <Image
                  src={
                    userMap[comment.uid]?.profileImage
                      ? userMap[comment.uid].profileImage
                      : "./img/sample_user.png"
                  }
                  width="40px"
                  height="40px"
                  borderRadius="50%"
                  objectFit="cover"
                />
                {comment.uid === currentUser.uid &&
                commentEdited === comment.id &&
                isEditing ? (
                  <Flex direction="column" width="100%">
                    <TextAreaField
                      value={editedContent}
                      style={{ color: "white" }}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <Flex direction="row" justifyContent="center">
                      <Button
                        backgroundColor="lightgreen"
                        onClick={async () => {
                          if (editedContent.trim() !== "") {
                            console.log("comment", comment);
                            await handleUpdateComment(
                              comment.id,
                              editedContent
                            );
                            setIsEditing(false);
                            setCommentEdited(null);
                            setEditedContent("");
                          } else {
                            // Handle empty content scenario if needed
                          }
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variation="destructive"
                        onClick={() => {
                          setCommentEdited(null);
                          setIsEditing(false);
                          setEditedContent("");
                        }}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Flex>
                ) : (
                  <Text
                    fontSize={{
                      base: "0.8rem",
                      medium: "1rem",
                      large: "1.2rem",
                    }}
                    marginBottom="0.5rem"
                    color="white"
                  >
                    {comment.content}
                  </Text>
                )}
              </Flex>
              {!isEditing && comment.uid === currentUser.uid && (
                <Flex direction="row" padding="1rem" justifyContent="flex-end">
                  <Button
                    variation="destructive"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variation="primary"
                    onClick={() => {
                      setCommentEdited(comment.id);
                      setEditedContent(comment.content);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                </Flex>
              )}
            </View>
          ))}
      </Flex>
      {!isEditing && (
        <Card
          variation="outline"
          width={{ base: "95%", medium: "75%", large: "60%" }}
          backgroundColor="transparent"
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <Heading
              level={2}
              fontWeight="bold"
              fontSize={{ base: "1rem", medium: "1.2rem", large: "1.5rem" }}
              color="white"
            >
              Leave a Comment:
            </Heading>
            <TextAreaField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={handleCommentTyping}
              placeholder="Share your thoughts..."
              marginBottom="1rem"
              width="100%"
              rows={4}
              style={{ color: "white" }}
            />
            {commentError && (
              <Text fontSize="0.8rem" color="red" marginBottom="0.5rem">
                Comment cannot be empty.
              </Text>
            )}
            <Button
              width={{ base: "90%", medium: "50%", large: "30%" }}
              variation="primary"
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </Button>
          </Flex>
        </Card>
      )}
    </Flex>
  );
}
