import PropTypes from "prop-types";

const CountryData = ({ country }) => {
  const languages = Object.entries(country.languages);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <h1 style={{ fontSize: 48 }}>{country.flag}</h1>
    </div>
  );
};

CountryData.propTypes = {
  country: PropTypes.object,
};

export default CountryData;
