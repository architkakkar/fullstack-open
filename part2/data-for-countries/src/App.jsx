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
    } else {
      setMessage("No matches found, specify another filter");
      setShowMessage(true);
    }
  };

  const getCountryData = (countryName) => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
      )
      .then((response) => {
        const countryData = response.data;
        const weatherData = getWeatherData(countryData.capital[0]);

        weatherData.then((wData) => {
          const newObj = {
            name: countryData.name.common,
            capital: countryData.capital[0],
            area: countryData.area,
            languages: countryData.languages,
            flag: countryData.flag,
            weather: {
              temperature: wData.current.temp_c,
              icon: wData.current.condition.icon,
              wind: wData.current.wind_mph,
            },
          };
          setCountryData(newObj);
          setShowCountryData(true);
        });

      });
  };

  const getWeatherData = (capitalName) => {
    const baseURL = "https://api.weatherapi.com/v1/current.json";
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const weatherData = axios
      .get(`${baseURL}?key=${apiKey}&q=${capitalName}`)
      .then((response) => response.data);

    return weatherData.then();
  };

  return (
    <div>
      <p>
        find countries: <input value={input} onChange={handleChange} />
      </p>
      {showMessage && input ? message : <></>}
      {showList ? (
        filteredList.map((name) => (
          <p key={name}>
            {`${name} `}
            <button onClick={() => getCountryData(name)}>show</button>
          </p>
        ))
      ) : (
        <></>
      )}
      {showCountryData ? <CountryData country={countryData} /> : <></>}
    </div>
  );
};

export default App;
