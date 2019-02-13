// --------------------------------------IMPORTS----------------------------------------
import * as React from "react";
import Logo from "./assets/logo.svg";
import styled from "styled-components";

// ----------------------------------STATE & PROPS INTERFACE-------------------------------
export interface HeaderProps {}

//------------------------------------HEADER STATELESS COMPONENT-----------------------------------------------

const Header = (props: HeaderProps) => {
  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;

// -------------------------------------STYLES-------------------------------------

const HeaderContainer = styled.header`
  @media (max-width: 768px) {
    text-align: center;
  }
`;
