const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../keys/keys");

const router = express.Router();

router.post("/api/users/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Bad Request!" });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(401).send({ message: "Authentication failed!" });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    return res.status(401).send({ message: "Authenticationa failed!" });
  }

  const token = jwt.sign(
    { id: existingUser._id, role: existingUser.role },
    JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.status(201).send(token);
});

module.exports = router;
