const express = require("express");
const app = express();
const db = require("./db");  //this should be in starting

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

app.get("/", function (req, res) {
    res.send("Welcome to my hotel");
});

// import the router files
const personRoutes = require("./routes/personRouter");
const menuRoutes = require("./routes/menuItemRoutes");

// use the routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
    console.log("listening on port 3000");
});

// app.post("/person", (req, res) => {
//   const data = req.body; // assuming the request body contains the person data

//   // Create a new person document using the Mongoose model , person type
//   // const newPerson = new Person();  // person type

//   // newPerson.name = data.name;
//   // newPerson.age = data.age;
//   // newPerson.mobile = data.mobile;
//   // newPerson.email = data.email;
//   /// newPerson.address = data.address;

//   const newPerson = new Person(data);

//   // Save the new person to the database
//   newPerson.save((error, savedPerson) => {
//     if (error) {
//       console.log("Error saving person:", error);
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       console.log("data saved successfully");
//       res.status(200).json(savedPerson);
//     }
//   });
// });
