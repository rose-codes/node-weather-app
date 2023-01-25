const path = require("path");
const express = require("express");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

publicFolderPath = path.join(__dirname, "../public");

//sets up handlebars library --> creates views (templates for dynamic pages) ==> stores in views folder
app.set("view engine", "hbs");

app.use(express.static(publicFolderPath));

app.get("", (req, res) => {
  //use render method to render hbs file from views --> no need for '.hbs" at end
  //second arg = obj w/ all values want view to access
  res.render("index", {
    title: "Weather App",
    name: "Jeff",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jeff",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
  });
});

//req = obj containing info about request
//res = obj containing methods to use in response
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     name: "Jeff",
//     age: 26,
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About page<h1>");
// });

// app.get("/weather", (req, res) => {
//   res.send({
//     forecast: "It is sunny",
//     location: "Encinitas",
//   });
// });

//start up server + specify port
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
