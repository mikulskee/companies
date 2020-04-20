import React, { useContext } from "react";
import styled from "styled-components";
import { CompaniesContext } from "../contexts/CompaniesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
const InputWrapper = styled.div`
  display: inline;
  border: 1px solid black;
  background-color: #fff;
  span {
    color: #757575;
    margin: 0 10px;
  }
  input {
    border: none;
    color: #757575;
    outline: none;
    padding: 5px 0;
    &:focus {
      border: none;
    }
  }
`;

const SearchInput = () => {
  const { displayDataViaSerchedPhrase } = useContext(CompaniesContext);

  const handleInputChange = (e) => {
    displayDataViaSerchedPhrase(e.target.value);
  };
  return (
    <Wrapper>
      <InputWrapper>
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>

        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleInputChange(e)}
        />
      </InputWrapper>
    </Wrapper>
  );
};

export default SearchInput;
