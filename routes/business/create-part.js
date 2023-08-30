const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-Auth");
const checkCeo = require("../../middlewares/check-CEO");
const Business = mongoose.model("businesses");
const User = mongoose.model("users");

const router = express.Router();

router.post(
  "/api/business/:id/part",
  checkAuth,
  checkCeo,
  async (req, res) => {
    const { part, employeeId } = req.body;
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(employeeId)
    ) {
      return res.status(400).send({ message: "Id not valid" });
    }

    if (!part) return res.status(400).send({ message: "Bad Request!" });

    const businessDoc = await Business.findById(id);

    if (!businessDoc)
      return res.status(400).send({ message: "Business not exists!" });

    const existingUser = await User.findById(employeeId);

    if (!existingUser)
      return res.status(400).send({ message: "Employee not exists!" });

    if (
      existingUser.ownerId !== req.currentUser.id ||
      businessDoc.ownerId !== req.currentUser.id
    )
      return res
        .status(403)
        .send({ message: "Employee is not under your control!" });

    const existingPart = businessDoc.parts.get(part);

    if (existingPart)
      return res.status(409).send({ message: "Part already exists!" });

    businessDoc.parts.set(part, employeeId);

    const latestBusinessDoc = await businessDoc.save();

    res.status(201).send(latestBusinessDoc);
  }
);

module.exports = router;
