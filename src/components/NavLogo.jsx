import styled from "styled-components";

const StyledNavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #89cff0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
`;
export function NavLogo() {
  return <StyledNavLogo>Currency Application</StyledNavLogo>;
}
