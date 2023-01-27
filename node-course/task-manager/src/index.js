const express = require("express");
const mongoose = require("mongoose");
// Don't need to set it equal to anything --> just want to make sure connection to Mongo is established
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

// Parses incoming JSON to object
app.use(express.json());

// Create User
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
});

// Read Multiple Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }

  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((err) => {
  //     res.status(500).send();
  //   });
});

// Read One User by Id
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const targetUser = await User.findById(_id).exec();
    if (!targetUser) {
      return res.status(404).send();
    }
    res.send(targetUser);
  } catch (err) {
    res.status(500).send(err);
  }

  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
});

// Update User
app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); /*new = set user to new object*/
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create Task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read One Task By Id
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const targetTask = await Task.findById(_id);
    console.log(targetTask);
    if (!targetTask) {
      return res.status(404).send(err);
    }
    res.send(targetTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update Task
app.patch("/tasks/:id", async (req, res) => {
  const userUpdates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = userUpdates.every((userUpdate) => {
    return allowedUpdates.includes(userUpdate);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
