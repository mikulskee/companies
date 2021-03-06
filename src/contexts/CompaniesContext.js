import React, { createContext, useState, useEffect } from "react";

export const CompaniesContext = createContext();

const CompaniesContextProvider = (props) => {
  const [companiesRawData, setCompaniesRawData] = useState([]);
  const [incomesRawData, setIncomesRawData] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const URL = "https://recruitment.hal.skygate.io/companies";
  const statsURL = "https://recruitment.hal.skygate.io/incomes/";

  const getCompanies = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getStats = async (item) => {
    try {
      const response = await fetch(`${statsURL}${item.id}`);
      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // multiple fetch for incomes data
    // get and set raw company data
    // get and set raw incomes data

    getCompanies().then((data) => {
      setCompaniesRawData(data);
      const table = data.map((data) => getStats(data));
      Promise.all(table).then((files) => setIncomesRawData(files));
    });
  }, []);

  useEffect(() => {
    // improve/make more readable array of incomes
    if (incomesRawData.length) {
      const table = incomesRawData
        .map((item) => ({
          id: item.id,
          totalIncome: item.incomes
            .map((item) => parseFloat(item.value))
            .reduce((a, b) => a + b, 0)
            .toFixed(2),
          average: (
            item.incomes
              .map((item) => parseFloat(item.value))
              .reduce((a, b) => a + b, 0) / item.incomes.length
          ).toFixed(2),
          lastMonth: item.incomes
            .map((item) => ({
              value: item.value,
              date: Date.parse(item.date),
            }))
            .sort((a, b) => b.date - a.date)
            .map((item) => ({
              value: item.value,
              date: `${new Date(item.date).getMonth()} ${new Date(
                item.date
              ).getFullYear()}`,
            })),
        }))
        .map((item) => {
          let shift = "";
          shift = item.lastMonth[0].date;
          const table = item.lastMonth.filter((item) => {
            return item.date === shift;
          });
          return {
            ...item,
            lastMonth: table
              .map((item) => item.value)
              .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
              .toFixed(2),
          };
        });

      setIncomes(table);
    }
  }, [incomesRawData]);

  useEffect(() => {
    // merge two arrays of data (company and icomes)
    if (incomes.length > 0) {
      let hash = new Map();
      companiesRawData.concat(incomes).forEach((obj) => {
        hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj));
      });
      const table = Array.from(hash.values());

      setMergedData(table);
    }
  }, [incomes, companiesRawData]);

  const sortMergedData = (sortBy) => {
    let newTable = [];
    let sortedTable;

    if (searchedData.length) {
      newTable = [...searchedData];
      sortedTable = (newTable) => {
        setSearchedData(newTable);
      };
    } else {
      newTable = [...mergedData];
      sortedTable = (newTable) => {
        setMergedData(newTable);
      };
    }

    switch (sortBy) {
      case "ID_ASC":
        newTable.sort((a, b) => a.id - b.id);
        sortedTable(newTable);
        break;
      case "ID_DESC":
        newTable.sort((a, b) => b.id - a.id);
        sortedTable(newTable);

        break;
      case "NAME_ASC":
        newTable.sort((a, b) => a.name.localeCompare(b.name));
        sortedTable(newTable);

        break;
      case "NAME_DESC":
        newTable.sort((a, b) => b.name.localeCompare(a.name));
        sortedTable(newTable);

        break;
      case "CITY_ASC":
        newTable.sort((a, b) => a.city.localeCompare(b.city));
        sortedTable(newTable);

        break;
      case "CITY_DESC":
        newTable.sort((a, b) => b.city.localeCompare(a.city));
        sortedTable(newTable);

        break;

      case "TOTAL_ASC":
        newTable.sort(
          (a, b) => parseFloat(a.totalIncome) - parseFloat(b.totalIncome)
        );
        sortedTable(newTable);

        break;
      case "TOTAL_DESC":
        newTable.sort(
          (a, b) => parseFloat(b.totalIncome) - parseFloat(a.totalIncome)
        );
        sortedTable(newTable);

        break;

      case "AVERAGE_ASC":
        newTable.sort((a, b) => parseFloat(a.average) - parseFloat(b.average));
        sortedTable(newTable);

        break;
      case "AVERAGE_DESC":
        newTable.sort((a, b) => parseFloat(b.average) - parseFloat(a.average));
        sortedTable(newTable);

        break;
      case "LAST_ASC":
        newTable.sort(
          (a, b) => parseFloat(a.lastMonth) - parseFloat(b.lastMonth)
        );
        sortedTable(newTable);

        break;
      case "LAST_DESC":
        newTable.sort(
          (a, b) => parseFloat(b.lastMonth) - parseFloat(a.lastMonth)
        );
        sortedTable(newTable);

        break;
      default:
        return;
    }
  };

  const displayDataViaSerchedPhrase = (inputValue) => {
    setInputValue(inputValue);

    if (inputValue.length) {
      const newTable = mergedData.filter((item) => {
        return Object.keys(item).some((i) => {
          return (
            item[i]
              .toString()
              .toLowerCase()
              .indexOf(inputValue.toLowerCase()) !== -1
          );
        });
      });

      setSearchedData(newTable);
    } else {
      setSearchedData([]);
    }
  };
  return (
    <CompaniesContext.Provider
      value={{
        mergedData,
        sortMergedData,
        displayDataViaSerchedPhrase,
        searchedData,
        inputValue,
      }}
    >
      {props.children}
    </CompaniesContext.Provider>
  );
};

export default CompaniesContextProvider;
