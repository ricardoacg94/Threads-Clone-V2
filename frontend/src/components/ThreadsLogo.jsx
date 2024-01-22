import React from "react";
import { Image, Flex, useColorMode } from "@chakra-ui/react";
export const ThreadsLogo = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={5} mb={10}>
      <Image
        w={50}
        cursor={"pointer"}
        alt="threads-logo"
        src={colorMode == "light" ? "/light.svg" : "/dark.svg"}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};
