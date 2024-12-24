import { useEffect, useState } from "react";
import axios from "axios";

import CountryData from "./components/CountryData";

const App = () => {
  const [input, setInput] = useState("");
  const [allCountryList, setAllCountryList] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [countryData, setCountryData] = useState({});
  const [showCountryData, setShowCountryData] = useState(false);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const countries = response.data;
        setAllCountryList(
          countries.map((country) => country.name.common).sort()
        );
      });
  }, []);

  const handleChange = (e) => {
    const countryName = e.target.value;
    setInput(countryName);

    setShowMessage(false);
    setShowList(false);
    setShowCountryData(false);

    const filteredCountryList = allCountryList.filter((country) => {
      return country.toLowerCase().includes(countryName.toLowerCase());
    });

    const countryListLength = filteredCountryList.length;

    if (countryListLength > 10) {
      setMessage("Too many matches, specify another filter");
      setShowMessage(true);
    } else if (countryListLength <= 10 && countryListLength > 1) {
      setFilteredList(filteredCountryList);
      setShowList(true);
    } else if (countryListLength == 1) {
      getCountryData(filteredCountryList);
    }
  };

  const getCountryData = (countryName) => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
      )
      .then((response) => {
        const data = response.data;

        setCountryData({
          name: data.name.common,
          capital: data.capital[0],
          area: data.area,
          languages: data.languages,
          flag: data.flag,
        });
        setShowCountryData(true);
      });
  };

  return (
    <div>
      <p>
        find countries: <input value={input} onChange={handleChange} />
      </p>
      {showMessage ? message : <></>}
      {showList ? filteredList.map((list) => <p key={list}>{list}</p>) : <></>}
      {showCountryData ? <CountryData country={countryData} /> : <></>}
    </div>
  );
};

export default App;
