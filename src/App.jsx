import styled from "styled-components";
import pulsingCoin from "./../public/images/pulsing_coin.gif";

const NavBar = styled.nav`
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

const StyledNavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #89cff0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
`;
function NavLogo() {
  return <StyledNavLogo>Currency Application</StyledNavLogo>;
}

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  color: #89cff0;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

function MainHeader() {
  return <Header>Currency Converter</Header>;
}

const Container = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CurrencyContainer = styled.div`
  border: 2px solid purple;
`;

const ConverterBox = styled.div`
  background: rgba(44, 47, 51, 0.8);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 500px;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const GifImage = styled.img``;

function App() {
  return (
    <>
      <NavBar>
        <NavLogo />
      </NavBar>
      <Container>
        <MainHeader />
        <ConverterBox></ConverterBox>
      </Container>
    </>
  );
}

export default App;
