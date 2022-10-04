import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Wrapper>
      <Element>Find the best dev or be the best</Element>

      {isAuthenticated && <Link to={"/search"}>Find Dev</Link>}
    </Wrapper>
  );
};

const Wrapper = styled.div `
display: flex;
`;

const Element = styled.div `
align-items: center;
justify-content: center;
`;

export default Home;
