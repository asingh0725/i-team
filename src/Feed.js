import React, { useContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Flex,
  useTheme,
  Card,
  Image,
  Text,
  Pagination,
  Loader,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaLocationDot } from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Feed() {
  const { tokens } = useTheme();
  const [posts, setPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      console.log("Snapshot", postSnapshot); // Log the snapshot
      const postList = postSnapshot.docs.map((doc) => doc.data());
      console.log("Posts", postList); // Log the posts
      setPosts(postList);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);
  console.log("posts outside useeffect: ", posts);
  if (!posts) {
    return null;
  }

  const postsPerPage = 3;
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const postCard = currentPosts.map((post) => {
    return (
      <Card
        variation="default"
        backgroundColor={tokens.colors.transparent}
        width={"50%"}
      >
        <Flex direction={"row"}>
          <Image
            width="15%"
            height="15%"
            src="img/sample_user.png"
            borderRadius={"50%"}
          />
          <Flex direction={"column"}>
            <Flex direction={"row"}>
              <FaLocationDot size={24} />
              <Text color={tokens.colors.white}>{post.location}</Text>
            </Flex>
            {post.imageArray.length > 1 ? (
              <Carousel width={"100%"} height="25vw">
                {post.imageArray.map((image, index) => (
                  <div key={index}>
                    <Image src={image} width={"86%"} height={"25vw"} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Carousel width={"100%"} height="25vw">
                {post.imageArray.map((image, index) => (
                  <div key={index}>
                    <Image src={image} width={"86%"} height={"25vw"} />
                  </div>
                ))}
              </Carousel>
            )}
            <Text color={tokens.colors.white} alignSelf={"flex-start"}>
              {post.caption}
            </Text>
          </Flex>
        </Flex>
      </Card>
    );
  });

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
      {isLoading ? (
        <Loader size="large" variation="linear" />
      ) : (
        <>
          {postCard}
          <Pagination
            backgroundColor={tokens.colors.white}
            borderRadius={tokens.radii.large}
            currentPage={currentPage}
            totalPages={totalPages}
            siblingCount={1}
            onChange={(newPageIndex) => setCurrentPage(newPageIndex)}
            onNext={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            nextLabel="Next"
            previousLabel="Previous"
          />
        </>
      )}
    </Flex>
  );
}

export default Feed;
