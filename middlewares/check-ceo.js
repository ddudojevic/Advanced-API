module.exports = (req, res, next) => {
  if (req.currentUser.role !== "CEO")
    return res.status(403).send({ message: "Not authenticated!" });

  next();
};
