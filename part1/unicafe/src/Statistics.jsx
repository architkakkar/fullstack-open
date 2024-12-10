import PropTypes from "prop-types";

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.total}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive} %</p>
    </div>
  );
};

Statistics.propTypes = {
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
    total: PropTypes.number,
    average: PropTypes.number,
    positive: PropTypes.number,
}

export default Statistics;
