import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
// import Footer from "./Footer";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Role from "./Role";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { DevContext } from "./DevContext";
import MyProfile from "./MyProfile";
import DevDetails from "./DevDetailes";
import LogInAsNonDevError from "./LogInAsNonDevError";

const App = () => {
  const { isAuthenticated } = useAuth0();

  const { setDevs,devs, newDevAdded } = useContext(DevContext);
  useEffect(() => {
    fetch("/api/get-devs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDevs(data.data);
      });
  }, [newDevAdded]);
  //if(devs.length===0) return <p>Loading...</p>
  return (
    <BrowserRouter>
      <Header />
      <Main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/loginasnondeverror"
            element={<LogInAsNonDevError />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/dev/:devId" element={<DevDetails />} />
          {isAuthenticated && <Route path="/role" element={<Role />} />}
        </Routes>
      </Main>
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
