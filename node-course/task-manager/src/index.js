const express = require("express");
// Don't need to set it equal to anything --> just want to make sure connection to Mongo is established
require("./db/mongoose");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

// Parses incoming JSON to object
app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
