import PropTypes from "prop-types";

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {`${person.name} ${person.number}`}{" "}
          <button onClick={() => onDelete(person.name, person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Persons;
