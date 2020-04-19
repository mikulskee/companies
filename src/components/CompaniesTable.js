import React, { useContext, useState } from "react";
import { CompaniesContext } from "../contexts/CompaniesContext";
import Pagination from "./Pagination";
import Posts from "./Posts";

const CompaniesTable = () => {
  const { mergedData } = useContext(CompaniesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(10);

  const indexOfLastPost = currentPage * companiesPerPage;
  const indexOfFirstPost = indexOfLastPost - companiesPerPage;
  const currentList = mergedData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      {mergedData.length > 0 ? (
        <Posts posts={currentList} />
      ) : (
        <h1>Ładowanie...</h1>
      )}
      <Pagination
        companiesPerPage={companiesPerPage}
        totalPosts={mergedData.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CompaniesTable;
