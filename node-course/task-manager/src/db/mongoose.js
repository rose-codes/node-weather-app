const mongoose = require("mongoose");
const validator = require("validator");

// Set up connection to database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewURLParser: true,
});

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
const task = new Task({
  description: "finish validation and sanitation challenge",
  completed: true,
});
task
  .save()
  .then(() => console.log(task))
  .catch((error) => console.log(error));

// LESSON CODE

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate: [
//       function (value) {
//         return validator.isEmail(value);
//       },
//       "Email is invalid",
//     ],
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minLength: 7,
//     validate: function (value) {
//       // if (value.length < 6) {
//       //   throw new Error("Password length must be longer than 6 characters");
//       // }
//       if (value.includes("password")) {
//         throw new Error('Password cannot contain "password"');
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate: function (value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     },
//   },
// });

// const me = new User({
//   name: "Jeff ",
//   email: "Jeff@gmail.com",
//   age: 26,
//   password: "test@pass1!",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
