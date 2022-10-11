import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

const Button = styled.button`
background-color: #ff86c9;
color: #001d31;
border-radius: 5px;
width: 100%;
font-family:ARIAL BLACK;
border: none;
`;

export default LogoutButton;