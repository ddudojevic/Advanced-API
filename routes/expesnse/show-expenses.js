const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-Auth");
const checkEmployee = require("../../middlewares/check-employee");
const Business = mongoose.model("businesses");
const Expense = mongoose.model("expenses");

const router = express.Router();

router.get(
  "/api/business/:id/expense",
  checkAuth,
  checkEmployee,
  async (req, res) => {
    const { partName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Id not valid!" });

    if (!partName) return res.status(400).send({ message: "Bad Request!" });

    const businessDoc = await Business.findById(req.params.id);

    if (!businessDoc)
      return res.status(400).send({ message: "Business not exists!" });

    const employeeId = await businessDoc.parts.get(partName);

    if (!employeeId)
      return res.status(400).send({ message: "Part not exists!" });

    if (employeeId !== req.currentUser.id && businessDoc.ownerId !== req.currentUser.id)
      return res
        .status(403)
        .send({ message: "You do not belong to this part!" });

    const expenseDocs = await Expense.find({ employeeId });

    res.status(200).send(expenseDocs);
  }
);

module.exports = router;
