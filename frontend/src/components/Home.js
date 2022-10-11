import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { DevContext } from "./DevContext";
import Search from "./Search";

const Home = () => {
  document.body.style.backgroundColor = "#001d31";

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
    <Body>

      <Wrapper>
        <Element>Find the best dev or be the best dev</Element>
        <DownwardArrow>🡇</DownwardArrow>
        <Link to={"/search"} style={{ textDecoration: 'none' }}><Div>Get Dev!?!?</Div></Link>
        <UpwardArrow>🡅</UpwardArrow>
      <Footer>..everything made simple. GetDev now!</Footer>
      </Wrapper>
    </Body>
  );
};

const Body = styled.div`
width: 100%;
height: 100%;
background-color: #001d31;
display: flex;
align-items: center;
justify-content: center;

`;


const Wrapper = styled.div`
background-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DownwardArrow = styled.div`
text-decoration: none;
color: #fff;
font-size: 20px;
margin-top: -35px;
`;

const Div = styled.div`
text-decoration: none;
color: #00be67;
font-size: 20px;
width: 100%;
height: 100%;
font-family:ARIAL BLACK;
color: #00be67;
`;
const Element = styled.div`
  /* font-size: x-large; */
  /* width: 100%; */
  color: #fff;
  font-family:  ARIAL BLACK;
  font-size: 40px;
  font-weight: normal;
  line-height: 60px;
  margin: 10px 0 20px;
  text-transform: uppercase;
  text-shadow: 2px 2px 0 #000;
  margin: 120px 0 24px ;
  text-align: center;
`;
const UpwardArrow = styled.div`
text-decoration: none;
color: #fff;
font-size: 15px;
margin-top: 300px;
`;
const Footer = styled.div`
text-decoration: none;
color: #00be67;
font-size: 12px;
width: fit-content;
height: fit-content;
font-family:ARIAL BLACK;
color: #ff86c9;
margin-bottom: 0px;
`;

export default Home;
