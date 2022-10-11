import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import LoginButton from "./login";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout";
import { DevContext } from "./DevContext";
import MyProfile from "./MyProfile";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  const { loggedUser } = useContext(DevContext);
  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <H1>GetDev</H1>
      </Link>
      {isAuthenticated && (
        <Link  to={`/profile`} style={{ textDecoration: 'none' }}>
          <Element> 
          Personal Profile
        
        </Element>
        </Link>

      )}
      <div>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton />}
      </div>
    </Wrapper>
  );
};

const H1 = styled.div`
width: 100%;
height: 100%;
font-family:ARIAL BLACK;
color: #00be67;
`;

// const Link = styled.link`
// text-decoration: none;
// `;
const Element = styled.div`
/* text-decoration: none; */
color: #ff86c9;
width: 100%;
height: 100%;
font-family:ARIAL BLACK;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: var(--color-alabama-crimson);
  height: 100px;
  padding: var(--padding-page) 18px;
  background-color: #001d31;
  `;
const Logo = styled.img`
  height: 60px;
  width: 550px;
  `;
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  `;
const StyledNavLink = styled(NavLink)`
  background: var(--color-selective-yellow);
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--color-alabama-crimson);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;
  background-color: white;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &:hover {
    background: var(--color-alabama-crimson);
    color: var(--color-selective-yellow);
    border-color: var(--color-selective-yellow);
  }
`;

export default Header;
