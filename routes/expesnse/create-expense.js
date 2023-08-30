const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-Auth");
const checkEmployee = require("../../middlewares/check-employee");
const Business = mongoose.model("businesses");
const Expense = mongoose.model("expenses");

const router = express.Router();

router.post(
  "/api/business/:id/expense",
  checkAuth,
  checkEmployee,
  async (req, res) => {
    const { title, partName } = req.body;

    if (!partName || !title)
      return res.status(400).send({ message: "Bad Request!" });

    const businessDoc = await Business.findById(req.params.id);

    if (!businessDoc)
      return res.status(400).send({ message: "Business not exists!" });

    const employeeId = await businessDoc.parts.get(partName);

    if (!employeeId)
      return res.status(400).send({ message: "Part not exists!" });

    if (
      employeeId !== req.currentUser.id &&
      businessDoc.ownerId !== req.currentUser.id
    )
      return res
        .status(403)
        .send({ message: "You do not belong to this part!" });

    const createdExpense = await Expense.create({
      title,
      date: new Date(),
      part: partName,
      businessId: businessDoc._id,
      employeeId,
    });

    res.status(201).send(createdExpense);
  }
);

module.exports = router;
