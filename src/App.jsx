import { useState, useEffect } from "react";
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
  const fetchRates = async () => {
    const res = await fetch("https://api.frankfurter.app/latest?base=USD");
    if (!res.ok) throw new Error("An Error has appeared. Please reload page");
    return res.json();
  };

  function CurrencyConverter() {
    const { data, isLoading, error } = useQuery(["currencyRates"], fetchRates);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data);
    return (
      <div>
        <h1>Currency Rates</h1>
      </div>
    );
  }

  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setConverted(data.rates[toCurr]);
        setIsLoading(false);
      }
      if (fromCurr === toCurr) return setConverted(amount);
      convert();
    },
    [amount, fromCurr, toCurr]
  );
  return (
    <>
      <NavBar />
      <Container>
        <MainHeader />
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
              {converted} {toCurr}
            </p>
          </CurrencyContainer>
        </StyledCurrencyBox>
      </Container>
    </>
  );
}

export default App;
