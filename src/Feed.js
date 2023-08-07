import React, { useContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import {
  Flex,
  useTheme,
  Card,
  Image,
  Text,
  Pagination,
  Loader,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaLocationDot } from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AuthContext } from "./AuthContext";

function Feed() {
  const { tokens } = useTheme();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [renderedPosts, setRenderedPosts] = useState([]);

  const { dataLoaded, setDataLoaded } = useContext(AuthContext);

  const fetchUserDetails = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.exists() ? userSnapshot.data() : null;
  };

  useEffect(() => {
    if (posts.length) {
      setDataLoaded((prev) => ({ ...prev, feed: true }));
    }
  }, [posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map((doc) => doc.data());
      setPosts(postList);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const renderPosts = async () => {
      const rendered = await Promise.all(
        currentPosts.map(async (post) => {
          const userDetails = await fetchUserDetails(post.uid);
          const userProfileImage = userDetails?.profileImage;

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
        })
      );
      setRenderedPosts(rendered);
    };

    renderPosts();
  }, [currentPosts, tokens.colors.white]);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (!dataLoaded.navBar || !dataLoaded.feed) {
    return <Loader size="large" variation="linear" />;
  }

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
      <>
        {renderedPosts}
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
    </Flex>
  );
}

export default Feed;
