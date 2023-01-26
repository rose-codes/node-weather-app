const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

// Define paths for Express config
const publicFolderPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
// sets up handlebars library --> creates views (templates for dynamic pages) ==> stores in views folder
app.set("view engine", "hbs");
// sets views in templates as views needed in handlebars w/o specifically naming the folder "views"
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicFolderPath));

//req = obj containing info about request
//res = obj containing methods to use in response
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
    helpText: "This is some help text",
    title: "Help Page",
    name: "Jeff",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  geocode(req.query.address, (err, { lat, lon, location } = {}) => {
    if (err) {
      // res.render("404", {
      //   title: "404",
      //   errorMessage: "Please check your connection",
      // });
      return res.send({ err });
    } else {
      weather(lat, lon, (err, { temp, description } = {}) => {
        if (err) {
          // res.render("404", {
          //   title: "404",
          //   errorMessage: err,
          // });
          return res.send({ err });
        } else {
          res.send({
            location,
            temp,
            description,
          });
        }
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Jeff",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Jeff",
  });
});
//start up server + specify port
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
