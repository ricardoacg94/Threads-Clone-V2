import { atom } from "recoil";

const authStateAtom = atom({
  key: "authStateAtom",
  default: "login",
});

export default authStateAtom;
