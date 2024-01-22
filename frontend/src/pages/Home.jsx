import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <Link to={"/ricardocoronado"}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button mx={"auto"}>Visite Profile Page</Button>
      </Flex>
    </Link>
  );
};
