import PropTypes from "prop-types";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value} {props.unit}</td>
    </tr>
  );
};

StatisticLine.propTypes = {
  text: PropTypes.string,
  value: PropTypes.number,
  unit: PropTypes.string
};

export default StatisticLine;
