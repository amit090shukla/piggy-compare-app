import * as React from "react";
import Logo from "./assets/logo.svg";
import styled from "styled-components";

export interface HeaderProps {}
const HeaderContainer = styled.header``;
export default class Header extends React.Component<HeaderProps, any> {
  public render() {
    return (
      <HeaderContainer>
        <img src={Logo} alt="Logo" />
      </HeaderContainer>
    );
  }
}
