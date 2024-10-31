const express = require("express")
const router = express.Router()
const MenuItem = require("../models/MenuItem")

// routes
// POST method route/endpoint to add a menu
router.post("/", async (req, res) => {
    try {
        const data = req.body

        const newMenu = new MenuItem(data)

        const response = await newMenu.save()
        console.log("data saved")
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// GET method route/endpoint to get the Menu
router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log("data fetched")
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// Get method route/endpoint to get menu by taste
router.get("/:tasteType", async (req, res) => {
    try {
        const tasteType = req.params.tasteType //Extract the taste type from the URL parameter
        if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
            const response = await MenuItem.find({ taste: tasteType })
            console.log("response fetched")
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: "Invalid taste type" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

//! '/menu' route is common in every route so we delete it from here and place in server.js file in personRoutes

// PUT method route/endpoint to update the menu by id
router.put("/:id", async (req, res) => {
    try {
        const menuId = req.params.id //Extract the id from the URL parameter
        const updateMenuData = req.body //update data for the person

        const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuData, {
            new: true,
            runValidators: true,
        })

        if (!response) {
            return res.status(404).json({ error: "MenuItem not found" })
        }

        console.log("menu data updated")
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

// DELETE method route/endpoint to delete the menu by id
router.delete("/:id", async (req, res) => {
    try {
        const menuId = req.params.id //Extract the id from the URL parameter

        // Assuming you have a menuItem model
        const response = await MenuItem.findByIdAndDelete(menuId)
        if (!response) {
            return res.status(404).json({ error: "MenuItem not found" })
        }
        console.log("data deleted")
        res.status(200).json({ message: "menu deleted successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

module.exports = router
