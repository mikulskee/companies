import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    li {
      margin: 0px 2px;
      button {
        background-color: #aaa;
        color: white;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
        border-left: 2px solid black;
        border-right: 1px solid black;
        padding: 5px 10px;
        &.active {
          background-color: #000;
          color: white;
        }
      }
    }
  }
`;

const Pagination = ({
  companiesPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const [currentSite, setCurrentSite] = useState(0);
  const [buttonsPerPage] = useState(3);
  const indexOfLastButton = currentSite + buttonsPerPage;
  const indexOfFirstButton = indexOfLastButton - buttonsPerPage;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / companiesPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentButtonList = pageNumbers.slice(
    indexOfFirstButton,
    indexOfLastButton
  );

  const handlePagination = (number, e) => {
    e.preventDefault();
    if (number === 1) {
      paginate(number);
      setCurrentSite(number - 1);
    } else if (number >= pageNumbers.length - (buttonsPerPage - 2)) {
      paginate(number);
      setCurrentSite(pageNumbers.length - buttonsPerPage);
    } else {
      paginate(number);
      setCurrentSite(number - 2);
    }
  };

  const switchPage = (id, e) => {
    e.preventDefault();
    if (id === "up") {
      handlePagination(currentPage + 1, e);
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage + 1);
      handlePagination(currentPage - 1, e);
    }
  };

  useEffect(() => {
    if (pageNumbers.length) {
      const buttons = document.querySelectorAll(".pagination-button");
      buttons.forEach((item, i) => {
        item.classList.remove("active");
        if (currentPage === parseInt(item.innerHTML)) {
          item.classList.add("active");
        }
      });
    }
  }, [currentPage, pageNumbers]);

  return (
    <Wrapper>
      {pageNumbers.length ? (
        <ul>
          {currentPage > 1 ? (
            <li>
              <button onClick={(e) => switchPage("down", e)}>{"<"}</button>
            </li>
          ) : null}
          {currentPage > 2 ? (
            <li>
              <button onClick={(e) => handlePagination(1, e)}>{1}</button> ...{" "}
            </li>
          ) : null}

          {currentButtonList.map((number) => (
            <li key={number}>
              <button
                className="pagination-button"
                onClick={(e) => handlePagination(number, e)}
              >
                {number}
              </button>
            </li>
          ))}

          {currentPage <= pageNumbers.length - (buttonsPerPage - 1) ? (
            <li>
              {" "}
              ...{" "}
              <button onClick={(e) => handlePagination(pageNumbers.length, e)}>
                {pageNumbers.length}
              </button>
            </li>
          ) : null}
          {currentPage !== pageNumbers.length ? (
            <li>
              <button onClick={(e) => switchPage("up", e)}>{">"}</button>
            </li>
          ) : null}
        </ul>
      ) : null}
    </Wrapper>
  );
};

export default Pagination;
