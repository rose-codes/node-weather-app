const express = require("express");
// Don't need to set it equal to anything --> just want to make sure connection to Mongo is established
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

// Parses incoming JSON to object
app.use(express.json());

// Create User
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Read Multiple Users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

// Read One User by Id
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create Task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Read All Tasks
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => res.send(tasks))
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Read One Task By Id
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => res.send(task))
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
