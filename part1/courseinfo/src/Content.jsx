import PropTypes from "prop-types";

const Content = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

Content.propTypes = {
  part: PropTypes.string,
  exercises: PropTypes.number,
};

export default Content;
