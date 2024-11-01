// this file is responsible for making database connection

const mongoose = require("mongoose");
require("dotenv").config()

// define the mongodb connection url
// const mongoURL = "mongodb://localhost:27017/mydatabase"; //replace 'mydatabse' with your database name "hotel"
// const mongoURL = "mongodb://127.0.0.1:27017/mydatabase"; //replace 'mydatabse' with your database name "hotel"
// const mongoURL = process.env.MONGODB_URL_LOCAL 
const mongoURL = process.env.MONGODB_URL

// set up mongoDB connection
// mongoose.connect("mongodb://127.0.0.1:27017/hotels")
mongoose.connect(mongoURL, {
  useNewUrlParser: true, // Enabling the new URL string parser
  useUnifiedTopology: true,
});

// default connection object
// get the default connection  // Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// default event listeners for database connections
db.on('connected', () => {
    console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
    console.error("MongoDB connection errors", err);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

// export the database connection
module.exports = db;

