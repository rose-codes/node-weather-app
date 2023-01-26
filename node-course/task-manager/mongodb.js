// native driver for npm created by mongodb company --> connect nodejs to mongodb
const mongodb = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const MongoClient = mongodb.MongoClient;

const connectionURL = process.env.CONNECTION_URL;
const databaseName = process.env.DATABASE_NAME;

// Set up connection to server
// Will need to refactor to supported connection syntax
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to db");
    }

    // Set up connection to db
    const db = client.db(databaseName);

    // Insert document into collection
    db.collection("users").insertOne({
      name: "Rose",
      age: 25,
    });
  }
);
