import React, { useContext } from "react";
import styled from "styled-components";
import { CompaniesContext } from "../contexts/CompaniesContext";

const Wrapper = styled.div`
  width: 100%;
  overflow: auto;
  padding: 10px 0;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  min-width: 360px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #666;

  &:nth-last-child(1) {
    border-bottom: 1px solid #666;
  }

  &:nth-child(odd) {
    background-color: #f3f3f3;
  }

  div:nth-child(1) {
    width: 13%;
  }
  div:nth-child(2) {
    width: 15%;
  }

  div {
    width: 18%;
    padding: 10px 5px;
    text-align: center;
    word-break: break-word;
    border-left: 1px solid #666;
    &:nth-last-child(1) {
      border-right: 1px solid #666;
    }

    &.header {
      font-weight: bold;
      word-break: keep-all;
      p {
        font-size: 12px;
        pointer-events: none;
      }
    }

    &.stats {
      p {
        font-size: 10px;
        &.active {
          color: white;
          background: green;
        }
      }
    }
  }
`;
const Posts = (props) => {
  const { posts } = props;
  const { sortMergedData } = useContext(CompaniesContext);

  const listOfCompanies = posts.map((company) => (
    <ListItem key={company.id}>
      <div className="stats">
        <p className="id data-text">{company.id}</p>
      </div>
      <div className="stats">
        <p className="name data-text">{company.name}</p>
      </div>
      <div className="stats ">
        <p className="company data-text">{company.city}</p>
      </div>
      <div className="stats">
        <p className="total data-text">{company.totalIncome}</p>
      </div>
      <div className="stats">
        <p className="average data-text">{company.average}</p>
      </div>
      <div className="stats">
        <p className="company data-text">{company.lastMonth}</p>
      </div>
    </ListItem>
  ));

  const handleClick = (e) => {
    e.target.classList.toggle("ASC");

    if (e.target.classList.contains("ASC")) {
      sortMergedData(`${e.target.id}_ASC`);
    } else {
      sortMergedData(`${e.target.id}_DESC`);
    }
  };

  return (
    <Wrapper>
      <List>
        <ListItem className="headers">
          <div className="id header" id="ID" onClick={(e) => handleClick(e)}>
            <p>ID</p>
          </div>
          <div
            className="name header"
            id="NAME"
            onClick={(e) => handleClick(e)}
          >
            <p>Name</p>
          </div>
          <div
            className="city header"
            id="CITY"
            onClick={(e) => handleClick(e)}
          >
            <p>City</p>
          </div>
          <div
            className="total header"
            id="TOTAL"
            onClick={(e) => handleClick(e)}
          >
            <p>Total Income</p>
          </div>
          <div
            className="average header"
            id="AVERAGE"
            onClick={(e) => handleClick(e)}
          >
            <p>Average Income</p>
          </div>
          <div
            className="last header"
            id="LAST"
            onClick={(e) => handleClick(e)}
          >
            <p>Last Month Income</p>
          </div>
        </ListItem>
        {listOfCompanies}
      </List>
    </Wrapper>
  );
};

export default Posts;
