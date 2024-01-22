import { useRecoilValue } from "recoil";
import { ThreadsLogo } from "./components/ThreadsLogo";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { PostPage } from "./pages/PostPage";
import { UserPage } from "./pages/UserPage";
import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import userAtom from "./atoms/User";
import { LogoutButton } from "./components/LogoutButton";
import { UpdateUser } from "./pages/UpdateUser";
function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container maxW={"620px"}>
      <ThreadsLogo />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Auth />} />
        <Route path="/auth" element={!user ? <Auth /> : <Home />} />
        <Route path="/:id" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
        <Route path="/update" element={user ? <UpdateUser /> : <Auth />} />
      </Routes>

      {user && <LogoutButton />}
    </Container>
  );
}

export default App;
