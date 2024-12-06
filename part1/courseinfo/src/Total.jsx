import PropTypes from "prop-types";

const Total = (props) => {
    return (
        <p>Number of Exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    );
}

Total.propTypes = {
    parts: PropTypes.array,
}

export default Total;