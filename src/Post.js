import React from "react";
import {
  Flex,
  useTheme,
  Card,
  Image,
  Text,
  Button,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { FaLocationDot } from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export function Post({ post, handleDetails, showButton }) {
  const { tokens } = useTheme();
  const userProfileImage = post.user?.profileImage;

  if (!post) {
    return <div>Error: Post data is not available.</div>;
  }

  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "50%",
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
      <Flex direction={"row"}>
        <Image
          objectFit="initial"
          height={["2.125rem", "5.125rem", "6rem"]}
          width={["2.125rem", "5.125rem", "6rem"]}
          src={userProfileImage ? userProfileImage : "img/sample_user.png"}
          borderRadius={"50%"}
        />
        <Flex direction={"column"}>
          <Flex direction={"row"} alignItems={"center"}>
            <FaLocationDot size={24} color="white" />
            <Text
              color={tokens.colors.white}
              fontSize={["1.15rem", "1.2rem", "1.25em"]}
            >
              {post.location}
            </Text>
            {showButton && (
              <Button variation="warning" onClick={handleDetails}>
                Comments
              </Button>
            )}
          </Flex>
          <Carousel
            width="100%"
            height="100%"
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
          >
            {post.imageArray.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  width={"100%"}
                  height={"auto"}
                  borderRadius={tokens.radii.large}
                />
              </div>
            ))}
          </Carousel>
          <Text
            color={tokens.colors.white}
            alignSelf={"flex-start"}
            fontSize={["0.8rem", "1.15rem", "1.2em"]}
          >
            {post.caption}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
