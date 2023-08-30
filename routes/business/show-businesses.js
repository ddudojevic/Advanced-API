const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-Auth");
const checkCeo = require("../../middlewares/check-CEO");
const Business = mongoose.model("businesses");

const router = express.Router();

router.get("/api/business", checkAuth, checkCeo, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.currentUser.id)) {
    return res.status(400).send({ message: "Id is not valid" });
  }
  const businessesDoc = await Business.find({ ownerId: req.currentUser.id });

  if (!businessesDoc || businessesDoc.length === 0)
    return res.status(400).send({ message: "Business does not exists!" });

  res.status(200).send(businessesDoc);
});

module.exports = router;
