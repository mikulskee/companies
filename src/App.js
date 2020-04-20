import React from "react";
import styled from "styled-components";
import CompaniesContextProvider from "./contexts/CompaniesContext";
import CompaniesTable from "./components/CompaniesTable";
const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin: 20px 0;
`;

const App = () => {
  return (
    <CompaniesContextProvider>
      <div className="App">
        <Title>Stats of Companies</Title>
        <CompaniesTable />
      </div>
    </CompaniesContextProvider>
  );
};

export default App;
