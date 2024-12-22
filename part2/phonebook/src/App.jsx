import { useEffect, useState } from "react";
import phonebookServices from "./services/phonebook";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    phonebookServices.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  const addContact = (e) => {
    e.preventDefault();

    const trimmedName = newName.trim();

    const newContact = {
      name: trimmedName,
      number: newNumber,
    };

    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${trimmedName} is already added to the phonebook`);
    } else {
      phonebookServices.create(newContact).then((returnedContact) => {
        setPersons([...persons, returnedContact]);
        setNewName("");
        setNewNumber("");
      });
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
