import React, { useContext } from "react";
import { PostContext } from "./PostContext";
import {
  Flex,
  useTheme,
  SelectField,
  Card,
  Image,
  Button,
  TextAreaField,
  Text,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaLocationDot } from "react-icons/fa6";

function Feed() {
  const { tokens } = useTheme();
  const { posts } = useContext(PostContext);
  console.log("Posts in Feed: ", posts);
  const postCard = posts.map((post) => {
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
            <Image src={post.imageArray[0]} />
            <Text color={tokens.colors.white} alignSelf={"flex-start"}>
              {post.caption}
            </Text>
          </Flex>
        </Flex>
      </Card>
    );
  });
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
      {postCard}
    </Flex>
  );
}

export default Feed;
