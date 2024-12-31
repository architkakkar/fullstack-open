import PropTypes from "prop-types";

const PersonForm = ({ addContact, name, setName, number, setNumber }) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name:{" "}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        number:{" "}
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  setNumber: PropTypes.func.isRequired,
};

export default PersonForm;
