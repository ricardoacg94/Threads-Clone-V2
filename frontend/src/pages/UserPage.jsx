import React from "react";
import { UserHeader } from "../components/UserHeader";
import { UserPost } from "../components/UserPost";

export const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        img={"/prom.png"}
        text={"Look at this Javascript Promises scenario"}
        likes={70}
        replies={2}
      />
      <UserPost
        img={"/fernandocurso.jpg"}
        text={"I truluy recommend this React Course from Fernando herrera"}
        likes={400}
        replies={15}
      />
      <UserPost
        img={"/libro.png"}
        text={"I love this Book"}
        likes={80}
        replies={10}
      />
      <UserPost text={"This is my first Threads"} likes={10} replies={1} />
    </>
  );
};
