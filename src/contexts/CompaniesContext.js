import React, { createContext, useState, useEffect } from "react";

export const CompaniesContext = createContext();

const CompaniesContextProvider = (props) => {
  const [companies, setCompanies] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const URL = "https://recruitment.hal.skygate.io/companies";
  const incomesURL = "https://recruitment.hal.skygate.io/incomes/";

  const getCompanies = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getIncomes = async (item) => {
    try {
      const response = await fetch(`${incomesURL}${item.id}`);
      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data);
      const table = data.map((data) => getIncomes(data));
      Promise.all(table).then((files) => setIncomes(files));
      setIncomes(table);
    });
  }, []);

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        setCompanies,
        getCompanies,
        incomes,
        setIncomes,
      }}
    >
      {props.children}
    </CompaniesContext.Provider>
  );
};

export default CompaniesContextProvider;
