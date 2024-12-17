import PropTypes from "prop-types";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>{`${person.name} ${person.number}`}</p>
      ))}
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.array.isRequired,
};

export default Persons;
