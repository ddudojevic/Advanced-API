const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../keys/keys");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    req.currentUser = decodedToken;
  } catch (error) {}
  next();
};
