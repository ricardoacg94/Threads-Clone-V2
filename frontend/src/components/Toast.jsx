import { Button, useToast } from "@chakra-ui/react";

export const Toast = () => {
  const toast = useToast();
  return toast({
    title: "Account created.",
    description: "We've created your account for you.",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};
