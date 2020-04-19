import React, { createContext, useState, useEffect } from "react";

export const CompaniesContext = createContext();

const CompaniesContextProvider = (props) => {
  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [fullData, setFullData] = useState([]);

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
    getCompanies().then((data) => {
      setCompanies(data);
      const table = data.map((data) => getStats(data));
      Promise.all(table).then((files) => setStats(files));
    });
  }, []);

  useEffect(() => {
    if (stats.length) {
      const table = stats
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

          return { ...item, lastMonth: table };
        });

      setIncomes(table);
    }
  }, [stats]);

  useEffect(() => {
    if (incomes.length > 0) {
      const dataTable = () => {
        let hash = new Map();
        companies.concat(incomes).forEach((obj) => {
          hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj));
        });
        const table = Array.from(hash.values());

        setFullData(table);
      };
      dataTable();
    }
  }, [incomes, companies]);

  return (
    <CompaniesContext.Provider
      value={{
        fullData,
      }}
    >
      {props.children}
    </CompaniesContext.Provider>
  );
};

export default CompaniesContextProvider;
