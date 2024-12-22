import PropTypes from "prop-types";
import phonebookServices from "../services/phonebook";

const Persons = ({ persons, setPersons }) => {
  const deletePerson = (name, id) => {
    const isConfirmed = confirm(`Delete ${name} ?`);

    if (isConfirmed) {
      phonebookServices.deleteContact(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {`${person.name} ${person.number}`}{" "}
          <button onClick={() => deletePerson(person.name, person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.array.isRequired,
  setPersons: PropTypes.func.isRequired,
};

export default Persons;
