import PropTypes from "prop-types";

const Total = ({ sum }) => (
  <p>
    <strong>total of {sum} exercises</strong>
  </p>
);

Total.propTypes = {
  sum: PropTypes.number,
};

export default Total;
