import React from "react";
import styled from "styled-components";
import CompaniesContextProvider from "./contexts/CompaniesContext";
import CompaniesTable from "./components/CompaniesTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin: 20px 0;
  @media only screen and (min-width: 1024px) {
    font-size: 42px;
  }
`;

const App = () => {
  return (
    <CompaniesContextProvider>
      <div className="App">
        <Title>
          Stats of Companies <FontAwesomeIcon icon={faChartBar} />
        </Title>
        <CompaniesTable />
      </div>
    </CompaniesContextProvider>
  );
};

export default App;
