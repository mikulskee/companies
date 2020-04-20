import React, { useContext } from "react";
import styled from "styled-components";
import { CompaniesContext } from "../contexts/CompaniesContext";

const Wrapper = styled.div``;

const SearchInput = () => {
  const { displayDataViaSerchedPhrase } = useContext(CompaniesContext);

  const handleInputChange = (e) => {
    displayDataViaSerchedPhrase(e.target.value);
  };
  return (
    <Wrapper>
      <input type="text" onChange={(e) => handleInputChange(e)} />
    </Wrapper>
  );
};

export default SearchInput;
