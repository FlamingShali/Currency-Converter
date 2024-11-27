import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import pulsingCoin from "./../public/images/pulsing_coin.gif";
import { NavBar } from "./components/NavBar";

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  color: #89cff0;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid purple;
  font-size: 2rem;
  width: 50vh;
  height: 5vh;
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

const StyledCurrencyBox = styled.div`
  display: flex;
`;

const GifImage = styled.img``;

function App() {
  const fetchRates = async ({ queryKey }) => {
    const [, from, to, amount] = queryKey;
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    if (!res.ok) throw new Error("Error fetching data");
    return res.json();
  };

  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [amount, setAmount] = useState(1);

  const { data, isLoading, error } = useQuery(
    ["currencyRates", fromCurr, toCurr, amount],
    fetchRates
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const convertedAmount = data ? data.rates[toCurr] * amount : 0;

  return (
    <>
      <NavBar />
      <Container>
        <Header>Currency Converter</Header>
        <StyledCurrencyBox>
          <img src={pulsingCoin} width={100} height={100} />
          <CurrencyContainer>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={isLoading}
            />
            <select
              value={fromCurr}
              onChange={(e) => setFromCurr(e.target.value)}
              disabled={isLoading}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
            <select
              value={toCurr}
              onChange={(e) => setToCurr(e.target.value)}
              disabled={isLoading}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
            <p>
              {convertedAmount} {toCurr}
            </p>
          </CurrencyContainer>
        </StyledCurrencyBox>
      </Container>
    </>
  );
}

export default App;
