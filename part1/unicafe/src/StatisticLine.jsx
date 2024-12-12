import PropTypes from "prop-types";

const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value} {props.unit}
    </p>
  );
};

StatisticLine.propTypes = {
  text: PropTypes.string,
  value: PropTypes.number,
  unit: PropTypes.string
};

export default StatisticLine;
