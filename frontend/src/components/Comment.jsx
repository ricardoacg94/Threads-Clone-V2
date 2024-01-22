import React, { useState } from "react";
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Actions } from "./Actions";
export const Comment = ({ image, username, message, createdAt }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4}>
        <Avatar src={image} />
        <Flex gap={2} w={"full"} flexDirection={"column"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontWeight={"bold"}>{username}</Text>
            <Flex gap={2} alignItems={"center"}>
              <Text>{createdAt}</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>{message}</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text color={"gray.light"} fontSize={"sm"}>
            {100 + (liked ? 1 : 0)} Likes
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
    </>
  );
};
