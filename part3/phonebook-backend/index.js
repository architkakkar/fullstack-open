require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

morgan.token("body", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let contacts = [];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</<h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments()
    .then((noOfRecords) => {
      response.send(`
        <p>Phonebook has info for ${noOfRecords} people</p>
        <p>${new Date()}</p>
      `);
    })
    .catch((error) => {
      response.status(500).send("Error retrieving document info");
    });
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

  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error.message);
      response.status(400).send({ error: "invalid id." });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
