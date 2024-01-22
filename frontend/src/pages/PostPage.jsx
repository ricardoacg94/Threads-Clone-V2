import {
  Flex,
  Avatar,
  Text,
  Image,
  Box,
  Divider,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Actions } from "../components/Actions";
import { Comment } from "../components/comment";
export const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex fontSize={"sm"} flexDirection={"column"} gap={3}>
        <Flex justifyContent={"space-between"}>
          <Flex alignItems={"center"} gap={2}>
            <Avatar src="/ricardo.jpg" />
            <Text fontWeight={"bold"}>ricardoacg94</Text>
            <Image boxSize="15px" src="/verified.png" />
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            <Text>1d</Text>
            <BsThreeDots />
          </Flex>
        </Flex>

        <Text>Look at this Javascript Promises scenario</Text>
        <Box
          border={"1px solid"}
          borderColor={"gray.light"}
          overflow={"hidden"}
          borderRadius={"6"}
        >
          <Image src="/prom.png" />
        </Box>
        <Flex my={2}>
          <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        <Flex gap={2} alignItems={"center"} color={"gray.light"}>
          <Text>2 replies</Text>
          <Box
            h={"2.5px"}
            w={"2.5px"}
            bg={"gray.light"}
            borderRadius={"full"}
          ></Box>
          <Text>{70 + (liked ? 1 : 0)} Likes</Text>
        </Flex>
      </Flex>
      <Divider my={4} />
      <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={2}>
          <Box>👋</Box>
          <Text color={"gray.light"}>Get the app to like , reply and post</Text>
        </Flex>
        <Flex>
          <Button>Get</Button>
        </Flex>
      </Flex>
      <Divider my={4} />
      <Comment
        image="https://img.freepik.com/free-photo/portrait-smiling-beautiful-woman-touching-her-face-with-natural-make-up-looking-cheerful-front-standing-against-white-wall_176420-38914.jpg?w=996&t=st=1698072715~exp=1698073315~hmac=8227aa7f3f03662a4dd9dbc4988e2e3ef8c44100279c96e853dd0c0fa6145250"
        username="Erika Maynard"
        message="This is a great info !"
        createdAt="2d"
      />
      <Comment
        image="https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2017/09/28/d872712c-a645-4d4a-8a75-a473c698aacf/dave-grohl-the-ultimate-rock-star"
        username="Dave Grohl"
        message="This is a masterpiece"
        createdAt="5d"
      />
      <Comment
        image="https://freepngimg.com/thumb/usain_bolt/23493-4-usain-bolt-hd.png"
        username="Usain Bolt"
        message="Man you are a Leyend"
        createdAt="7d"
      />
    </>
  );
};
