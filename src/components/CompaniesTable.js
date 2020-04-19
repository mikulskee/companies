import React, { useContext, useEffect, useState } from "react";
import { CompaniesContext } from "../contexts/CompaniesContext";
import Pagination from "./Pagination";

const CompaniesTable = () => {
  const { fullData } = useContext(CompaniesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage, setCompaniesPerPage] = useState(10);

  useEffect(() => {
    if (fullData.length > 0) {
      const table = fullData.map((item) => {
        const table = item.lastMonth
          .map((item) => item.value)
          .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        return table;
      });
      console.log(table);
    }
  }, [fullData]);

  const indexOfLastPost = currentPage * companiesPerPage;
  const indexOfFirstPost = indexOfLastPost - companiesPerPage;
  const currentList = fullData.slice(indexOfFirstPost, indexOfLastPost);

  const listOfCompanies = currentList.map((company) => (
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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <ul>{fullData.length > 0 ? listOfCompanies : <h1>Ładowanie...</h1>}</ul>
      <Pagination
        companiesPerPage={companiesPerPage}
        totalPosts={fullData.length}
        paginate={paginate}
      />
    </>
  );
};

export default CompaniesTable;
