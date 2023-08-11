import React, { useState } from "react";
import { Flex, useTheme, Pagination, View } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { Post } from "./Post";

export function Feed(props) {
  const posts = props.posts;
  const navigate = useNavigate();
  const { tokens } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      alignContent="center"
      wrap="nowrap"
      gap="2rem"
      padding="1rem"
      minHeight="100vh"
      width="100%"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        gap="2rem"
      >
        {currentPosts.map((post) => {
          const handleDetails = () => {
            navigate(`/home/${post.id}`);
          };
          return (
            <Flex
              alignContent="center"
              direction="column"
              justifyContent="center"
              alignItems="center"
              width={["100%", "80%", "60%"]}
              gap="1rem"
            >
              <View
                as="div"
                width={{ base: "100%", large: "80%" }}
                padding="1rem"
                borderRadius="6px"
                border="1px solid var(--amplify-colors-black)"
                boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
                backgroundColor={tokens.colors.green}
              >
                <Post
                  post={post}
                  handleDetails={handleDetails}
                  showButton={true}
                />
              </View>
            </Flex>
          );
        })}
      </Flex>
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
