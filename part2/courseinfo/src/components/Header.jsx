import PropTypes from "prop-types";

const Header = ({ name }) => <h2>{name}</h2>;

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;
