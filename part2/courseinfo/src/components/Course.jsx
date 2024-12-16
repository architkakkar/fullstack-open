import PropTypes from "prop-types";

import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const sum = course.parts.reduce((result, part) => {
    return result + part.exercises;
  }, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  );
};

Course.propTypes = {
  course: PropTypes.object,
};

export default Course;
