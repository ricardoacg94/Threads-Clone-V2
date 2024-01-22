import React from "react";
import {
  VStack,
  Box,
  Flex,
  Text,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
export const UserHeader = () => {
  const toast = useToast();
  const copyUrl = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);

    toast({ title: "Link copied" });
  };
  return (
    <VStack gap={4} align={"start"} mt={5}>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Box>
          <Text fontSize={30} fontWeight={"bold"}>
            Ricardo Coronado
          </Text>
          <Flex align={"center"} gap={2}>
            <Text> Ricardoacg94</Text>
            <Text
              fontSize={"sm"}
              color={"gray.light"}
              bg={"gray.dark"}
              borderRadius={"full"}
              p={1}
            >
              Threads.next{" "}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar size={"xl"} src="/ricardo.jpg" />
        </Box>
      </Flex>
      <Text>
        FullStack Web Developer, Political Scientist, Student of Software
        Engineer
      </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex align={"center"} gap={2}>
          <Text color={"gray.light"}>20 followers </Text>{" "}
          <Box borderRadius={"full"} bg={"gray.light"} h={1} w={1}></Box>
          <Link color={"gray.light"}>instagram.com </Link>
        </Flex>
        <Flex gap={2}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            className="icon"
          >
            <BsInstagram size={24} />{" "}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            className="icon"
          >
            <Menu>
              <MenuButton>
                <CgMoreO size={24} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem onClick={copyUrl} bg={"gray.dark"}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Flex
          cursor={"pointer"}
          justify={"center"}
          flex={1}
          borderBottom={"1.5px solid white"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>

        <Flex
          cursor={"pointer"}
          justify={"center"}
          flex={1}
          borderBottom={"1.5px solid gray"}
        >
          <Text color={"gray"} fontWeight={"bold"}>
            Replies
          </Text>
        </Flex>
      </Flex>
    </VStack>
  );
};
