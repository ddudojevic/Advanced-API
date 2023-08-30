const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-Auth");
const checkCeo = require("../../middlewares/check-CEO");
const Business = mongoose.model("businesses");

const router = express.Router();

router.post("/api/business", checkAuth, checkCeo, async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).send({ message: "Bad Request!" });

  const createdBusiness = await Business.create({
    name,
    parts: {},
    ownerId: req.currentUser.id,
  });

  res.status(201).send(createdBusiness);
});

module.exports = router;
