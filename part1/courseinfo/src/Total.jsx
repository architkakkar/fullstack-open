import PropTypes from "prop-types";

const Total = (props) => {
    return (
        <p>Number of Exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    );
}

Total.propTypes = {
    exercises2: PropTypes.number,
    exercises3: PropTypes.number,
    exercises1: PropTypes.number,
}

export default Total;