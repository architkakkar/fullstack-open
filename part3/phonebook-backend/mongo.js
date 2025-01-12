const mongoose = require("mongoose");

switch (process.argv.length) {
case 1:
case 2: {
  console.log("give only password as arguments to view all records.");
  console.log(
    "give password and person details as arguments to add new entry to phonebook."
  );
  process.exit(1);
  break;
}
case 3: {
  const password = process.argv[2];

  const url = `mongodb+srv://fullstack:${password}@cluster0.cjkm5.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  });

  break;
}
case 4: {
  console.log("give both name & number as arguments.");
  process.exit(1);
  break;
}
case 5: {
  const password = process.argv[2];
  const name = process.argv[3];
  const number = process.argv[4];

  const url = `mongodb+srv://fullstack:${password}@cluster0.cjkm5.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);

    mongoose.connection.close();
  });

  break;
}
default: {
  console.log("max arguments should be 5.");
}
}
