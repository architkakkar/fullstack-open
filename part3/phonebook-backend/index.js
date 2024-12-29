const express = require("express");
const app = express();

app.use(express.json());

let contacts = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</<h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(contacts);
});

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    response.json(contact);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    contacts = contacts.filter((contact) => contact.id !== id);
    response.status(204).end();
  } else {
    response.status(404).send({ error: `No contact exists with id: ${id}` });
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const newContact = {
    id: Math.floor(Math.random() * 999999),
    name: body.name,
    number: body.number,
  };

  contacts = [...contacts, newContact];

  response.status(201).json({
    id: newContact.id,
    message: "Created successfully.",
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
