import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Role from "./Role";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { DevContext } from "./DevContext";

const App = () => {
  const { isAuthenticated } = useAuth0();

  const { setDevs, newDevAdded } = useContext(DevContext);
  useEffect(() => {
    fetch("/api/get-devs")
      .then((res) => res.json())
      .then((data) => {
        setDevs(data.data);
      });
  }, [newDevAdded]);
  return (
    <BrowserRouter>
      <Header />
      <Main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          {isAuthenticated && <Route path="/role" element={<Role />} />}
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
`;

export default App;
