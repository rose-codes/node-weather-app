const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

// Create Task
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read All Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read One Task By Id
router.get("/tasks/:id", async (req, res) => {
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
router.patch("/tasks/:id", async (req, res) => {
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
router.delete("/tasks/:id", async (req, res) => {
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

module.exports = router;
