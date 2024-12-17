import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (e) => {
    e.preventDefault();

    const trimmedName = newName.trim();

    const newPerson = {
      name: trimmedName,
    };

    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${trimmedName} is already added to the phonebook`);
    } else {
      setPersons([...persons, newPerson]);
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
