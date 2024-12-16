import PropTypes from "prop-types";

const Header = ({ name }) => <h1>{name}</h1>;

Header.propTypes = { name: PropTypes.string };

const Total = ({ sum }) => (
  <p>
    <strong>total of {sum} exercises</strong>
  </p>
);

Total.propTypes = { sum: PropTypes.number };

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

Part.propTypes = { part: PropTypes.object };

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

Content.propTypes = { parts: PropTypes.array };

const Course = ({ course }) => {
  const sum = course.parts.reduce((result, part) => result + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
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
      },
      {
        name: "Router",
        exercises: 20,
        id: 4,
      },
      {
        name: "Redux",
        exercises: 5,
        id: 5,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
