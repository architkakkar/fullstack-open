import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  const addContact = (e) => {
    e.preventDefault();

    const trimmedName = newName.trim();

    const newPerson = {
      name: trimmedName,
      number: newNumber,
      id: persons.length + 1,
    };

    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${trimmedName} is already added to the phonebook`);
    } else {
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchText={searchText} setSearchText={setSearchText} />
      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        name={newName}
        setName={setNewName}
        number={newNumber}
        setNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPerson} />
    </div>
  );
};

export default App;
