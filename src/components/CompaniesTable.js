import React, { useContext } from "react";
import { CompaniesContext } from "../contexts/CompaniesContext";

const CompaniesTable = () => {
  const { fullData } = useContext(CompaniesContext);

  const listOfCompanies = fullData.map((company) => (
    <li key={company.id}>
      <h3>
        {company.id}. <br />
        Name: {company.name}
        <br /> City: {company.city}
        <br />
        Total Income: {company.totalIncome}
        <br />
        Average Income: {company.average} <br />
        Last Month Income:{" "}
        {company.lastMonth
          .map((item) => item.value)
          .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
          .toFixed(2)}
      </h3>
    </li>
  ));

  return <>{fullData.length > 0 ? listOfCompanies : <h1>Ładowanie...</h1>}</>;
};

export default CompaniesTable;
