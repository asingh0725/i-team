import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {
  Flex,
  useTheme,
  Card,
  Image,
  Text,
  Pagination,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaLocationDot } from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Feed() {
  const { tokens } = useTheme();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUserDetails = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.exists() ? userSnapshot.data() : null;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = await Promise.all(
        postSnapshot.docs.map(async (doc) => {
          const postData = doc.data();
          const userDetails = await fetchUserDetails(postData.uid);
          return { ...postData, user: userDetails };
        })
      );
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      wrap="nowrap"
      gap="2rem"
      padding={"3rem"}
      width={"100%"}
      height={"100%"}
    >
      {currentPosts.map((post) => {
        const userProfileImage = post.user?.profileImage;
        return (
          <Card
            variation="default"
            backgroundColor={tokens.colors.transparent}
            width={"50%"}
            key={post.id}
          >
            <Flex direction={"row"}>
              <Image
                width="15%"
                height="15%"
                src={userProfileImage}
                borderRadius={"50%"}
              />
              <Flex direction={"column"}>
                <Flex direction={"row"}>
                  <FaLocationDot size={24} />
                  <Text color={tokens.colors.white}>{post.location}</Text>
                </Flex>
                <Carousel width={"100%"} height="25vw">
                  {post.imageArray.map((image, index) => (
                    <div key={index}>
                      <Image src={image} width={"86%"} height={"25vw"} />
                    </div>
                  ))}
                </Carousel>
                <Text color={tokens.colors.white} alignSelf={"flex-start"}>
                  {post.caption}
                </Text>
              </Flex>
            </Flex>
          </Card>
        );
      })}
      <Pagination
        backgroundColor={tokens.colors.white}
        borderRadius={tokens.radii.large}
        currentPage={currentPage}
        totalPages={totalPages}
        siblingCount={1}
        onChange={(newPageIndex) => setCurrentPage(newPageIndex)}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        nextLabel="Next"
        previousLabel="Previous"
      />
    </Flex>
  );
}

export default Feed;
