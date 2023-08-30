const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../../middlewares/check-Auth");
const checkCeo = require("../../middlewares/check-CEO");
const Business = mongoose.model("businesses");

const router = express.Router();

router.get("/api/business/:id", checkAuth, checkCeo, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({ message: "Id not valid!" });

  const businessDoc = await Business.findById(req.params.id);

  if (!businessDoc)
    return res.status(400).send({ message: "Business not exists!" });

  if (businessDoc.ownerId !== req.currentUser.id)
    return res
      .status(403)
      .send({ message: "This business not belongs to you!" });

  res.status(200).send(businessDoc);
});

module.exports = router;
