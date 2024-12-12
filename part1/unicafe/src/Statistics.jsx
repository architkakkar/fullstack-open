import PropTypes from "prop-types";
import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="total" value={props.total} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" unit=" %" value={props.positive} />
      </div>
    );
  }
};

Statistics.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
  total: PropTypes.number,
  average: PropTypes.number,
  positive: PropTypes.number,
};

export default Statistics;
