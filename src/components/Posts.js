import React, { useContext } from "react";
import styled from "styled-components";
import { CompaniesContext } from "../contexts/CompaniesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  overflow: auto;
  padding: 10px 0;
`;

const List = styled.ul`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  min-width: 360px;
  max-width: 1240px;
  @media only screen and (min-width: 1024px) {
    width: 98%;
  }
  @media only screen and (min-width: 1366px) {
    width: 80%;
  }
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

  div.id {
    width: 13%;
    @media only screen and (min-width: 1024px) {
      width: 6%;
    }
  }
  div.name {
    width: 15%;
    @media only screen and (min-width: 1024px) {
      width: 22%;
    }
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
      display: flex;
      font-weight: bold;
      word-break: keep-all;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      p {
        font-size: 12px;
        pointer-events: none;
        @media only screen and (min-width: 1024px) {
          font-size: 16px;
        }
        @media only screen and (min-width: 1366px) {
          font-size: 20px;
        }
      }

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        pointer-events: none;
        opacity: 0;
        &.active-up {
          opacity: 1;
          svg:nth-child(1) {
            color: #000;
          }
          svg:nth-child(2) {
            color: #bbb;
          }
        }
        &.active-down {
          opacity: 1;
          svg:nth-child(2) {
            color: #000;
          }
          svg:nth-child(1) {
            color: #bbb;
          }
        }
        svg {
          margin: -6px 4px;
          color: #bbb;
        }
      }
    }

    &.stats {
      p {
        font-size: 10px;
        @media only screen and (min-width: 1024px) {
          font-size: 12px;
        }
        @media only screen and (min-width: 1366px) {
          font-size: 14px;
        }

        &.name {
          font-weight: bold;
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
      <div className="stats id">
        <p className="id data-text">{company.id}</p>
      </div>
      <div className="stats name">
        <p className="name data-text">{company.name}</p>
      </div>
      <div className="stats company">
        <p className="company data-text">{company.city}</p>
      </div>
      <div className="stats total">
        <p className="total data-text">{company.totalIncome}</p>
      </div>
      <div className="stats average">
        <p className="average data-text">{company.average}</p>
      </div>
      <div className="stats lastmonth">
        <p className="lastmonth data-text">{company.lastMonth}</p>
      </div>
    </ListItem>
  ));

  const handleClick = (e) => {
    if (e.target.querySelector("span").classList.contains("active-down")) {
      document
        .querySelectorAll("div.header span")
        .forEach((item) => item.classList.remove("active-down"));
      e.target.querySelector("span").classList.add("active-up");
    } else {
      document
        .querySelectorAll("div.header span")
        .forEach((item) => item.classList.remove("active-up", "active-down"));
      e.target.querySelector("span").classList.add("active-down");
    }

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
            <span className="sorting-icons">
              <FontAwesomeIcon icon={faSortUp} />
              <FontAwesomeIcon icon={faSortDown} />
            </span>
          </div>

          <div
            className="name header"
            id="NAME"
            onClick={(e) => handleClick(e)}
          >
            <p>Name</p>
            <span className="sorting-icons">
              <FontAwesomeIcon icon={faSortUp} />
              <FontAwesomeIcon icon={faSortDown} />
            </span>
          </div>

          <div
            className="city header"
            id="CITY"
            onClick={(e) => handleClick(e)}
          >
            <p>City</p>
            <span className="sorting-icons">
              <FontAwesomeIcon icon={faSortUp} />
              <FontAwesomeIcon icon={faSortDown} />
            </span>
          </div>

          <div
            className="total header"
            id="TOTAL"
            onClick={(e) => handleClick(e)}
          >
            <p>Total Income</p>
            <span className="sorting-icons">
              <FontAwesomeIcon icon={faSortUp} />
              <FontAwesomeIcon icon={faSortDown} />
            </span>
          </div>

          <div
            className="average header"
            id="AVERAGE"
            onClick={(e) => handleClick(e)}
          >
            <p>Average Income</p>
            <span className="sorting-icons">
              <FontAwesomeIcon icon={faSortUp} />
              <FontAwesomeIcon icon={faSortDown} />
            </span>
          </div>

          <div
            className="last header"
            id="LAST"
            onClick={(e) => handleClick(e)}
          >
            <p>Last Month Income</p>
            <span className="sorting-icons">
              <FontAwesomeIcon icon={faSortUp} />
              <FontAwesomeIcon icon={faSortDown} />
            </span>
          </div>
        </ListItem>
        {listOfCompanies}
      </List>
    </Wrapper>
  );
};

export default Posts;
