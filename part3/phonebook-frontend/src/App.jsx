import { useEffect, useState } from "react";
import phonebookServices from "./services/phonebook";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

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

    const duplicate = persons.find(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (duplicate) {
      const isConfirm = confirm(
        `${trimmedName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (isConfirm) {
        phonebookServices
          .update(duplicate.id, { ...newContact })
          .then((returnedContact) => {
            setPersons(
              persons.map((person) =>
                person.id !== duplicate.id ? person : returnedContact
              )
            );
            setNotificationType("success");
            setNotification(`${duplicate.name} number updated.`);
          });
      }
    } else {
      phonebookServices
        .create(newContact)
        .then((returnedContact) => {
          setPersons([...persons, returnedContact]);
          setNotificationType("success");
          setNotification(`Added ${newContact.name}`);
        })
        .catch((error) => {
          setNotificationType("error");
          setNotification(error.response.data.error);
        });
    }
    setNewName("");
    setNewNumber("");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const deletePerson = (name, id) => {
    const isConfirmed = confirm(`Delete ${name} ?`);

    if (isConfirmed) {
      phonebookServices
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotificationType("success");
          setNotification(`Deleted ${name}.`);
        })
        .catch(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotificationType("error");
          setNotification(
            `Information of '${name}' has already been removed from server`
          );
        });
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {showNotification ? (
        <Notification message={notification} type={notificationType} />
      ) : (
        <></>
      )}
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
      <Persons persons={filteredPerson} onDelete={deletePerson} />
    </div>
  );
};

export default App;
