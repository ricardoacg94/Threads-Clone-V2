import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Actions } from "./Actions";
import { Link } from "react-router-dom";
export const UserPost = ({ img, text, likes, replies }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/RicardoCoronado/post/1"}>
      <Flex my={5} py={5} gap={4}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar src="/ricardo.jpg"></Avatar>
          <Box mt={1} w={0.5} height={"full"} bg={"gray.light "}></Box>
          <Box position={"relative"} mt={1}>
            <Avatar
              position={"absolute"}
              src="https://bit.ly/ryan-florence"
              size={"xs"}
              top={"8px"}
              left={"-12px"}
            ></Avatar>
            <Avatar
              src="https://bit.ly/sage-adebayo"
              position={"absolute"}
              size={"xs"}
              top={"-20px"}
              left={"6px"}
            ></Avatar>
            <Avatar
              src="https://bit.ly/kent-c-dodds"
              position={"absolute"}
              size={"xs"}
              top={"-20px"}
              left={"-28px"}
            ></Avatar>
          </Box>
        </Flex>

        <Flex flexDirection={"column"} flex={1}>
          <Flex w={"full"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Ricardo Coronado
              </Text>
              <Avatar size={"xs"} src="/verified.png"></Avatar>
            </Flex>
            <Flex gap={2} alignItems={"center"}>
              <Text>1d</Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"sm"} color={"light.gray"}>
            {text}
          </Text>

          {img && (
            <Box
              borderRadius={"6"}
              overflow={"hidden"}
              borderColor={"gray.light"}
              mt={2}
            >
              <Image src={img} />
            </Box>
          )}

          <Flex my={2}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex mt={3} fontSize={"sm"} gap={2} alignItems={"center"}>
            <Text>{replies}</Text>
            <Box w={"5px"} h={"5px"} bg={"gray"} borderRadius={"full"}></Box>
            <Text>{likes + (liked ? 1 : 0)} Likes</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
