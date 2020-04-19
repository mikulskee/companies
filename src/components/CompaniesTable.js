import React, { useContext, useEffect, useState } from "react";
import { CompaniesContext } from "../contexts/CompaniesContext";
import Pagination from "./Pagination";
import Posts from "./Posts";

const CompaniesTable = () => {
  const { fullData } = useContext(CompaniesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage, setCompaniesPerPage] = useState(10);

  useEffect(() => {
    if (fullData.length > 0) {
      fullData.map((item) => {
        const table = item.lastMonth
          .map((item) => item.value)
          .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        return table;
      });
    }
  }, [fullData]);

  const indexOfLastPost = currentPage * companiesPerPage;
  const indexOfFirstPost = indexOfLastPost - companiesPerPage;
  const currentList = fullData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      {fullData.length > 0 ? (
        <Posts posts={currentList} />
      ) : (
        <h1>Ładowanie...</h1>
      )}
      <Pagination
        companiesPerPage={companiesPerPage}
        totalPosts={fullData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default CompaniesTable;
