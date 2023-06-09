import express from "express";
import User from "../models/User.js";
import Player from "../models/Player.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.find({username: username}); //
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

router.post("/", async (req, res) => {
  const { username, email } = req.body;
  
  const isUsernameRepeated = await User.exists({ username });
  const isEmailRepeated = await User.exists({ email });
  const isPlayerNameRepeated = await Player.exists({ username })

  if (isUsernameRepeated || isEmailRepeated || isPlayerNameRepeated) {
    return res.status(400).json("El nombre de usuario o correo electrónico ya están registrados");
  }

  const user = new User(req.body);
  const player = new Player(req.body);
  try {
    await user.save();
    await player.save()
    console.log(user);
    return res.status(201).send();
  } catch (err) {
    return res.status(400).json(err.message);
  }

});

router.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(updatedUser);
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "Successful deleted" });
});

export { router };
