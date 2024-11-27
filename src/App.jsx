import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import pulsingCoin from "./../public/images/pulsing_coin.gif";
import { NavBar } from "./components/NavBar";

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to right,
    #1e3c72,
    #2a5298
  ); /* Gradient background */
`;

const CurrencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  width: 50vh;
  margin-top: 20px;
`;

const StyledCurrencyBox = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  padding: 15px;
  border: 2px solid #fff;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.5rem;
  margin-bottom: 15px;
  transition: background 0.3s ease;
  &:focus {
    background: rgba(255, 255, 255, 0.3);
    border-color: #89cff0;
  }
`;

function App() {
  const fetchRates = async ({ queryKey }) => {
    const [, from, to, amount] = queryKey;
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    if (!res.ok) throw new Error("Error fetching data");
    return res.json();
  };

  const StyledSelect = styled.select`
    padding: 15px;
    border: 2px solid #fff;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1.5rem;
    margin-bottom: 15px;
    transition: background 0.3s ease;
    &:focus {
      background: rgba(255, 255, 255, 0.3);
      border-color: #89cff0;
    }
  `;

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
            <StyledInput
              type="text"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={isLoading}
            />
            <StyledSelect
              value={fromCurr}
              onChange={(e) => setFromCurr(e.target.value)}
              disabled={isLoading}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </StyledSelect>
            <StyledSelect
              value={toCurr}
              onChange={(e) => setToCurr(e.target.value)}
              disabled={isLoading}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </StyledSelect>
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
