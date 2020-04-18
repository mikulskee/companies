import React, { useContext } from "react";
import { CompaniesContext } from "../contexts/CompaniesContext";

const CompaniesTable = () => {
  const { companies } = useContext(CompaniesContext);

  return (
    <>
      {companies ? (
        companies.map((company) => (
          <li key={company.id}>
            <h3>
              {company.id}. Name:{company.name} City:{company.city}
            </h3>
          </li>
        ))
      ) : (
        <h1>Ładowanie...</h1>
      )}
    </>
  );
};

export default CompaniesTable;
