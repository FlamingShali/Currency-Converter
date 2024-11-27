import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavBar } from "./components/NavBar";

const AppContainer = styled.div`
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Inter", sans-serif;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 10px;
`;

const SubHeader = styled.p`
  font-size: 1rem;
  color: #b3b3b3;
  margin-bottom: 40px;
`;

const ConverterBox = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 90%;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  background-color: #292929;
  color: #fff;
  border: 1px solid #4b6b8c;
  border-radius: 10px;
  padding: 12px;
  font-size: 1rem;
  width: 100%;
`;

const StyledSelect = styled.select`
  background-color: #292929;
  color: #ffffff;
  border: 1px solid #4b6b8c;
  border-radius: 10px;
  padding: 12px;
  font-size: 1rem;
  width: 100%;
  appearance: none;

  option {
    background-color: #292929;
    color: #ffffff;
  }
`;

const ConvertButton = styled.button`
  background-color: #4b6b8c;
  color: #ffffff;
  padding: 12px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #596e92;
  }
`;

const fetchRates = async ({ queryKey }) => {
  const [, from, to, amount] = queryKey;
  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
  );
  if (!res.ok) throw new Error("Error fetching rates");
  return res.json();
};

// Fetch all currencies
const fetchCurrencies = async () => {
  const res = await fetch("https://api.frankfurter.app/currencies");
  if (!res.ok) throw new Error("Error fetching currencies");
  return res.json();
};

function App() {
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [amount, setAmount] = useState(1);

  // Fetch currencies
  const { data: currencies, isLoading: isCurrenciesLoading } = useQuery(
    ["currencies"],
    fetchCurrencies
  );

  // Fetch conversion rates
  const { data, isLoading, error } = useQuery(
    ["currencyRates", fromCurr, toCurr, amount],
    fetchRates
  );

  const convertedAmount = data?.rates[toCurr] || 0;

  if (isCurrenciesLoading || isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function onAmountHandler(e) {
    setAmount(Number(e.target.value));
  }

  return (
    <AppContainer>
      <NavBar />
      <Header>Currency Converter</Header>
      <SubHeader>Convert currencies with live rates</SubHeader>
      <ConverterBox>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching data</p>
        ) : (
          <>
            <Field>
              <label>Amount</label>
              <StyledInput
                type="number"
                value={amount}
                onChange={onAmountHandler}
              />
            </Field>
            <Field>
              <label>From</label>
              <StyledSelect
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value)}
              >
                {Object.entries(currencies).map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} - {name}
                  </option>
                ))}
              </StyledSelect>
            </Field>
            <Field>
              <label>To</label>
              <StyledSelect
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
              >
                {Object.entries(currencies).map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} - {name}
                  </option>
                ))}
              </StyledSelect>
            </Field>
            <ConvertButton>Convert</ConvertButton>
            <Field>
              <p>
                {amount === 0
                  ? "Type how much money do you want to convert"
                  : `${amount} ${fromCurr} = ${convertedAmount.toFixed(
                      2
                    )} ${toCurr}`}
              </p>
            </Field>
          </>
        )}
      </ConverterBox>
    </AppContainer>
  );
}

export default App;
