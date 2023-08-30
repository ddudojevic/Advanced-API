const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/api/users/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ message: "Bad Request!" });

  const existingUser = await User.findOne({ email });

  if (existingUser)
    return res
      .status(409)
      .send({ message: "User with that email already exists!" });

  const hashedPassowrd = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    email,
    password: hashedPassowrd,
    role: "CUSTOMER",
  });

  res.status(201).send(createdUser);
});

module.exports = router;
