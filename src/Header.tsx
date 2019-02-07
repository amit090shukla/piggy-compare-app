import * as React from "react";
import Logo from "./assets/logo.svg";
import styled from "styled-components";

export interface HeaderProps {}
const HeaderContainer = styled.header`
  @media (max-width: 768px) {
    text-align:center;
  }
`;
export default class Header extends React.Component<HeaderProps, any> {
  public render() {
    return (
      <HeaderContainer>
        <img src={Logo} alt="Logo" />
      </HeaderContainer>
    );
  }
}
