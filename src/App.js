import React from "react";
import CompaniesContextProvider from "./contexts/CompaniesContext";
import CompaniesTable from "./components/CompaniesTable";

const App = () => {
  return (
    <CompaniesContextProvider>
      <div className="App">
        <div>
          <h1>Hello World!</h1>
        </div>
      </div>
      <CompaniesTable />
    </CompaniesContextProvider>
  );
};

export default App;
