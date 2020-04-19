import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;

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
    border: 1px solid black;
    &.header {
      font-weight: bold;
      word-break: keep-all;
      p {
        font-size: 12px;
      }
    }

    &.stats {
      p {
        font-size: 10px;
      }
    }
  }
`;
const Posts = (props) => {
  const { posts } = props;

  const listOfCompanies = posts.map((company) => (
    <ListItem key={company.id}>
      <div className="stats">
        <p>{company.id}</p>
      </div>
      <div className="stats">
        <p className="name">{company.name}</p>
      </div>
      <div className="stats">
        <p>{company.city}</p>
      </div>
      <div className="stats">
        <p>{company.totalIncome}</p>
      </div>
      <div className="stats">
        <p>{company.average}</p>
      </div>
      <div className="stats">
        <p>
          {company.lastMonth
            .map((item) => item.value)
            .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
            .toFixed(2)}
        </p>
      </div>
    </ListItem>
  ));

  return (
    <Wrapper>
      <ListItem className="headers">
        <div className="id header">
          <p>ID</p>
        </div>
        <div className="name header">
          <p>Name</p>
        </div>
        <div className="city header">
          <p>City</p>
        </div>
        <div className="total header">
          <p>Total Income</p>
        </div>
        <div className="average header">
          <p>Average Income</p>
        </div>
        <div className="last header">
          <p>Last Month Income</p>
        </div>
      </ListItem>
      {listOfCompanies}
    </Wrapper>
  );
};

export default Posts;
