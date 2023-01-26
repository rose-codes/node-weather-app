const mongoose = require("mongoose");
const validator = require("validator");

// Set up schema for Task model
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create Task model
const Task = mongoose.model("Task", taskSchema);

// Create instance of Task and add it to tasks table
// const task = new Task({
//   description: "finish validation and sanitation challenge",
//   completed: true,
// });
// task
//   .save()
//   .then(() => console.log(task))
//   .catch((error) => console.log(error));
module.exports = Task;
