import PropTypes from "prop-types";

const Header = ({ name }) => <h1>{name}</h1>;

Header.propTypes = { name: PropTypes.string };

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

Total.propTypes = { sum: PropTypes.number };

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

Part.propTypes = { part: PropTypes.object };

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);

Content.propTypes = { parts: PropTypes.array };

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  );
};

Course.propTypes = { course: PropTypes.object };

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      }
    ],
  };

  return <Course course={course} />;
};

export default App;
