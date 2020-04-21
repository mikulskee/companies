import React, { useContext, useState, useEffect } from "react";
import { CompaniesContext } from "../contexts/CompaniesContext";
import Pagination from "./Pagination";
import Posts from "./Posts";
import SearchInput from "./SearchInput";
import Loader from "./Loader";
import { Warning } from "./Warning";

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
            <Warning>Brak wyników dla frazy "{inputValue}" </Warning>
          ) : (
            <Posts posts={currentList} />
          )}
        </>
      ) : (
        <Loader />
      )}
      {searchedData.length === 0 && inputValue.length !== 0 ? null : (
        <Pagination
          companiesPerPage={companiesPerPage}
          totalPosts={
            searchedData.length ? searchedData.length : mergedData.length
          }
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          inputValue={inputValue}
        />
      )}
    </>
  );
};

export default CompaniesTable;
