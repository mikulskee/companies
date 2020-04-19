import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
`;

const Pagination = ({
  companiesPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const [currentSite, setCurrentSite] = useState(0);
  const [buttonsPerPage] = useState(10);
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

  const handlePagination = (number) => {
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

  return (
    <Wrapper>
      <ul>
        {currentPage > 2 ? (
          <li>
            <button onClick={() => handlePagination(1)}>{1}</button> ...
          </li>
        ) : null}

        {currentButtonList.map((number) => (
          <li key={number}>
            <button onClick={() => handlePagination(number)}>{number}</button>
          </li>
        ))}

        {currentPage !== pageNumbers.length ? (
          <li>
            ...{" "}
            <button onClick={() => handlePagination(pageNumbers.length)}>
              {pageNumbers.length}
            </button>
          </li>
        ) : null}
      </ul>
    </Wrapper>
  );
};

export default Pagination;
