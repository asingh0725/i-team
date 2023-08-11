import React, { useState } from "react";
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
} from "@aws-amplify/ui-react";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "./firebase";

export function PostPage({ posts, userMap, comments, currentUser }) {
  const { postId } = useParams();
  const post = posts.find((post) => post.id === postId);
  const userDetails = post ? userMap[post.uid] : null;
  const userProfileImage = userDetails?.profileImage || "";
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState(comments[postId] || []);

  const [commentError, setCommentError] = useState(false);

  const handleCommentSubmit = async () => {
    if (comment.trim() !== "") {
      const newComment = {
        content: comment,
        postId: postId,
        uid: currentUser.uid,
        profileImage: userMap[currentUser.uid]?.profileImage || "",
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

  if (!post || !userDetails) {
    return <Loader variation="linear" />;
  }

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
        as="div"
        width={{ base: "100%", large: "50%" }}
        padding="1rem"
        borderRadius="6px"
        border="1px solid var(--amplify-colors-black)"
        boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
      >
        <Post post={post} showButton={false} />
      </View>
      <Flex
        direction="column"
        width={{ base: "100%", large: "50%" }}
        gap="2rem"
      >
        {postComments ? (
          postComments.map((comment, index) => (
            <View
              as="div"
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
                  src={comment.profileImage}
                  width="40px"
                  height="40px"
                  borderRadius="50%"
                  objectFit="cover"
                />
                <Text
                  fontSize={{ base: "0.8rem", medium: "1rem", large: "1.2rem" }}
                  marginBottom="0.5rem"
                  color={"white"}
                >
                  {comment.content}
                </Text>
              </Flex>
            </View>
          ))
        ) : (
          <></>
        )}
      </Flex>
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
          />
          {commentError && (
            <Text
              variation="error"
              fontSize="0.8rem"
              color="red"
              marginBottom="0.5rem"
            >
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
    </Flex>
  );
}
