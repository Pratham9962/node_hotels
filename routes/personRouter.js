const express = require('express');
const router = express.Router();
const Person = require("../models/Person");

//! CREATE
// POST route/endpoint to add a person
router.post("/", async (req, res) => {  //place async here because there is db operation which will take a time
    try {
        const data = req.body; // assuming the request body contains the person data which client send 

        // Create a new person document using the Mongoose model , person type
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
  }
});

//! READ
// GET method route/endpoint to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// GET method route/endpoint to get the person by worktype
router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType; //Extract the work type from the URL parameter
        if (workType == "cheif" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType });
            console.log("response fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: "Invalid work type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//! '/person' route is common in every route so we delete it from here and place in server.js file in personRoutes

//! UPDATE
// PUT method route/endpoint to update the person by id
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;  //Extract the id from the URL parameter
        const updatePersonData = req.body; //update data for the person

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,  //Return the updated document
            runValidators: true,  //Run Mongoose validators
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('person data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//! DELETE
// DELETE method route/endpoint to delete the person by id
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extract the id from the URL parameter

        // Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("data deleted");
        res.status(200).json({message: 'person Deleted Successfully'});
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;