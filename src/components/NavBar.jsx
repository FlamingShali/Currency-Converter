import styled from "styled-components";
import { NavLogo } from "./NavLogo";

const StyledNavBar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: rgba(30, 30, 47, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`;

export function NavBar() {
  return <StyledNavBar> <NavLogo /></StyledNavBar>;
}
