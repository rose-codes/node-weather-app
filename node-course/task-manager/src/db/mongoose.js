const mongoose = require("mongoose");

// Set up connection to database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewURLParser: true,
});
