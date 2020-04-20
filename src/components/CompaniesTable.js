import React, { useContext, useState, useEffect } from "react";
import { CompaniesContext } from "../contexts/CompaniesContext";
import Pagination from "./Pagination";
import Posts from "./Posts";
import SearchInput from "./SearchInput";

const CompaniesTable = () => {
  const { mergedData, searchedData, inputValue } = useContext(CompaniesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(10);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    if (searchedData.length) {
      const indexOfLastPost = currentPage * companiesPerPage;
      const indexOfFirstPost = indexOfLastPost - companiesPerPage;
      setCurrentList(searchedData.slice(indexOfFirstPost, indexOfLastPost));
    } else {
      const indexOfLastPost = currentPage * companiesPerPage;
      const indexOfFirstPost = indexOfLastPost - companiesPerPage;
      setCurrentList(mergedData.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [companiesPerPage, currentPage, mergedData, searchedData]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {mergedData ? <SearchInput /> : null}
      {mergedData.length > 0 ? (
        <>
          {searchedData.length === 0 && inputValue.length !== 0 ? (
            <h1>Brak wyników dla frazy "{inputValue}" </h1>
          ) : (
            <Posts posts={currentList} />
          )}
        </>
      ) : (
        <h1>Ładowanie...</h1>
      )}
      <Pagination
        companiesPerPage={companiesPerPage}
        totalPosts={
          searchedData.length ? searchedData.length : mergedData.length
        }
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default CompaniesTable;
