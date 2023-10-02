const express = require("express");
const router = express.Router();
const userModels = require("../models/userModels");


router.get("/", async (req, res) => {
  try{
    const users = await userModels.find();
    res.status(200).json(users)

  }catch(error){
    res.status(500).json({ error: 'Error fetching user data' });
  }

});

router.post("/create", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    console.log("Received data:", { name, email, age });
    const newUser = new userModels({
      name,
      email,
      age
    });

    await newUser.save();

    // Check if the save operation was successful
    if (newUser) {
      res.status(201).json({ message: "Data sent successfully..." });
    } else {
      res.status(500).json({ error: "Failed to save data to the database" });
    }
  } catch (error) {
    res.status(500).json({ error: "Data Send Error" });
  }
});

// Update Route
router.put("/update/:id", async (req, res) => {
  try {
    const {id} = req.params
    const { name, email, age } = req.body;
   
    const updateUser = await userModels.findByIdAndUpdate(
      id,
      {name,email,age},
      {new: true}
      );

    // Check if the save operation was successful
    if (updateUser) {
      res.status(200).json({ message: "Data Update successfully..." });
    } else {
      res.status(500).json({ error: "Failed to update data to the database" });
    }
  } catch (error) {
    res.status(500).json({ error: "Data update Error" });
    console.log(error)
  }
});


// Delete Route
router.delete("/delete/:id", async (req, res) => {
  try {
    const {id} = req.params
   
    const deleteUser = await userModels.findByIdAndDelete(id)

    // Check if the save operation was successful
    if (deleteUser) {
      res.status(200).json({ message: "Data Delete successfully..." });
    } else {
      res.status(500).json({ error: "Failed to delete data to the database" });
    }
  } catch (error) {
    res.status(500).json({ error: "Data delete Error" });
    console.log(error)
  }
});



module.exports = router;
