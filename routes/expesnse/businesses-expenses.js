const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-Auth");
const checkCEO = require("../../middlewares/check-CEO");
const Business = mongoose.model("businesses");
const Expense = mongoose.model("expenses");

const router = express.Router();

router.get("/api/business/expense/all-expenses", checkAuth, checkCEO, async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.currentUser.id))
      return res.status(400).send({ message: "Id not valid!" });

  const businesses = await Business.find({ ownerId: req.currentUser.id });
  console.log(businesses)

  if (!businesses || businesses.length === 0)
    return res.status(404).send({ message: "Expense not found!" });

  
  let expenses = []
  for (const business of businesses) {
    const expense = await Expense.find({ businessId: business._id });
    expenses.push(...expense);
  };

  res.status(200).send(expenses);
});

module.exports = router;
