// native driver for npm created by mongodb company --> connect nodejs to mongodb
// const mongodb = require("mongodb");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config();

// const MongoClient = mongodb.MongoClient;

const connectionURL = process.env.CONNECTION_URL;
const databaseName = process.env.DATABASE_NAME;

const client = new MongoClient(connectionURL, { useNewUrlParser: true });
client
  .db(databaseName)
  .collection("tasks")
  .findOne({ _id: new ObjectId("63d2027883a25c4e80f23aeb") })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

client
  .db(databaseName)
  .collection("tasks")
  .find({ completed: false })
  .toArray()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
// client
//   .db(databaseName)
//   .collection("users")
//   .findOne({ _id: new ObjectId("63d1fd6f047e118bed01bf04") })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// client
//   .db(databaseName)
//   .collection("users")
//   .find({ age: 27 })
//   .toArray()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// client
//   .db(databaseName)
//   .collection("users")
//   .insertOne({
//     _id: id,
//     name: "Jeff",
//     age: 26,
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// client.db(databaseName).collection("tasks");
// .insertMany([
//   {
//     description: "finish tutorial",
//     completed: false,
//   },
//   {
//     description: "make dinner",
//     completed: true,
//   },
//   {
//     description: "fold laundry",
//     completed: false,
//   },
// ])
// .then((result) => {
//   console.log(result);
// })
// .catch((error) => {
//   console.log(error);
// });

// // Set up connection to server
// // Will need to refactor to supported connection syntax
// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to db");
//     }

//     // Set up connection to db
//     const db = client.db(databaseName);

//     // // Insert document into collection
//     // db.collection("users")
//     //   .insertOne({
//     //     name: "Rose",
//     //     age: 25,
//     //   })
//     //   .then((result) => {
//     //     console.log(result.insertedId);
//     //   })
//     //   .catch((error) => {
//     //     console.log("Unable to insert user");
//     //   });

//     // // Insert many documents into collection
//     // db.collection("users")
//     //   .insertMany([
//     //     {
//     //       name: "Jen",
//     //       age: 28,
//     //     },
//     //     {
//     //       name: "Gunther",
//     //       age: 27,
//     //     },
//     //   ])
//     //   .then((result) => {
//     //     console.log(result);
//     //   })
//     //   .catch((err) => console.log(err));

//     db.collection()
//   }
// );
