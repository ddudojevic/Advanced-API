module.exports = (req, res, next) => {
  if (req.currentUser.role !== "EMPLOYEE")
    return res.status(403).send({ message: "Not authenticated!" });

  next();
};
