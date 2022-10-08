import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { DevContext } from "./DevContext";
import Search from "./Search";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setLoggedUser, loggedUser } = useContext(DevContext);
  console.log("loggedUser", loggedUser);
  // console.log("testing",user)
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/api/getUser/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data.user) {
            setLoggedUser(data.user);
          } else if (data.nonDevUser) {
            console.log(data.nonDevUse);
            setLoggedUser(data.nonDevUser);
          } else {
            if (loggedUser === "") {
              navigate("/role");
            }
          }
        });
    }
  }, [isAuthenticated]);

  return (
    <Wrapper>
      <Element>Find the best dev or be the best</Element>
      <Link to={"/search"}>Find Dev</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Element = styled.div`
  align-items: center;
  justify-content: center;
`;

export default Home;
