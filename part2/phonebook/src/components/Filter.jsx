import PropTypes from "prop-types";

const Filter = ({ searchText, setSearchText }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

Filter.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
};

export default Filter;
