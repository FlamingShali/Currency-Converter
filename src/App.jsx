import styled from "styled-components";
import pulsingCoin from "./../public/images/pulsing_coin.gif";

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  color: #89cff0;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  text-align: center;
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
    <Container>
      <Header>Welcome to Currency Converter</Header>

      <ConverterBox>
        <Field></Field>
      </ConverterBox>
    </Container>
  );
}

export default App;
