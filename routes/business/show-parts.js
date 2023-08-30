const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-Auth");
const checkEmployee = require("../../middlewares/check-employee");
const Business = mongoose.model("businesses");
const User = mongoose.model("users");

const router = express.Router();

router.get(
  "/api/business/part/my-parts",
  checkAuth,
  checkEmployee,
  async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.currentUser.id))
      return res.status(400).send({ message: "Id is not valid!" });

    const employee = await User.findOne({ _id: req.currentUser.id });

    if (!employee) {
      return res.status(404).send({ message: "Employee not found!" });
    }

    const businesses = await Business.find({ ownerId: employee.ownerId });

    if (!businesses) {
      return res
        .status(400)
        .send({ message: "Employee is not assigned to any parts!" });
    }

    let employeeParts = [];
    for (const business of businesses) {
      const partsForEmployee = business.parts.get(req.currentUser.id);
      if (partsForEmployee) {
        employeeParts.push(...partsForEmployee);
      }
    }

    res.status(200).send(employeeParts);
  }
);

module.exports = router;
