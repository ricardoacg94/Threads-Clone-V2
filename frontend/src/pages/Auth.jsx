import React from "react";
import SignUp from "../components/SignUp";
import authStateAtom from "../atoms/Auth";
import { useRecoilValue } from "recoil";
import Login from "../components/Login";

export const Auth = () => {
  const authState = useRecoilValue(authStateAtom);
  return <>{authState == "login" ? <Login /> : <SignUp />}</>;
};
