import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useToastMessage } from "../hooks/useToast";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/User";

export const LogoutButton = () => {
  const showToast = useToastMessage();
  const [user, setUser] = useRecoilState(userAtom);
  const handdleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/jason",
        },
      });

      const data = res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex position={"fixed"} top={"30px"} right={"30px"}>
      <Button size={"sm"} onClick={handdleLogout}>
        Logout
      </Button>
    </Flex>
  );
};
